import { useState, useEffect } from "react";
import { api } from "../api";
import Icon from "../components/Icon";
import { getCurrentWeekBounds } from "../utils";
import WeekView from "./WeekView";

export default function DashboardPage({ userName }) {
  const [recipes, setRecipes]     = useState([]);
  const [weekMeals, setWeekMeals] = useState([]);
  const [loading, setLoading]     = useState(true);

  const { monday, sunday } = getCurrentWeekBounds();
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    Promise.all([
      api.fetch("/api/recipes").then(r => r.ok ? r.json() : []),
      api.fetch(`/api/meals?from=${monday}&to=${sunday}`).then(r => r.ok ? r.json() : []),
    ]).then(([recs, meals]) => {
      setRecipes(recs);
      setWeekMeals(meals);
      setLoading(false);
    });
  }, [monday, sunday]);

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const displayName = userName?.split("@")[0] || "there";
  const todayMeal = weekMeals.find(m => m.mealDate?.slice(0, 10) === todayStr);

  return (
    <>
      <div className="page-header">
        <h1>{greet()}, {displayName}</h1>
        <p>Here's an overview of your week</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="icon-badge" style={{ background: "var(--sage-100)", color: "var(--sage-600)" }}>
            <Icon name="book" size={20} />
          </div>
          <div className="label">Total Recipes</div>
          <div className="value">{loading ? "—" : recipes.length}</div>
          <div className="sub">in your collection</div>
        </div>
        <div className="stat-card">
          <div className="icon-badge" style={{ background: "#fff7ed", color: "var(--clay)" }}>
            <Icon name="calendar" size={20} />
          </div>
          <div className="label">Planned this week</div>
          <div className="value">{loading ? "—" : weekMeals.length}</div>
          <div className="sub">of 7 days</div>
        </div>
        <div className="stat-card">
          <div className="icon-badge" style={{ background: "var(--warm-100)", color: "#92400e" }}>
            <Icon name="leaf" size={20} />
          </div>
          <div className="label">Today</div>
          <div className="value" style={{ fontSize: loading || !todayMeal ? 36 : 18, paddingTop: todayMeal ? 4 : 0 }}>
            {loading ? "—" : todayMeal ? todayMeal.mealName : "Nothing planned"}
          </div>
          <div className="sub">{todayMeal ? "on the menu" : "add a meal in planner"}</div>
        </div>
      </div>

      <h2 className="section-title" style={{ marginBottom: 16 }}>This week</h2>
      <WeekView meals={weekMeals} loading={loading} />
    </>
  );
}
