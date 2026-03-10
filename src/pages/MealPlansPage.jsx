import { useState, useEffect } from "react";
import { api } from "../api";
import Icon from "../components/Icon";
import { formatDate } from "../utils";

export default function MealPlansPage({ onSelectPlan }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetch("/api/mealplans")
      .then(async r => { if (r.ok) setPlans(await r.json()); })
      .finally(() => setLoading(false));
  }, []);

  const getDateRange = (meals) => {
    if (!meals?.length) return "No meals";
    const dates = meals.map(m => m.mealDate?.slice(0, 10)).filter(Boolean).sort();
    if (dates.length === 1) return formatDate(dates[0]);
    return `${formatDate(dates[0])} – ${formatDate(dates[dates.length - 1])}`;
  };

  const getMealPreview = (meals) => {
    if (!meals?.length) return "No meals";
    const names = meals
      .slice()
      .sort((a, b) => (a.mealDate ?? "").localeCompare(b.mealDate ?? ""))
      .map(m => m.mealName);
    const preview = names.slice(0, 3).join(", ");
    return names.length > 3 ? `${preview} +${names.length - 3} more` : preview;
  };

  return (
    <>
      <div className="page-header">
        <h1>Meal Plans</h1>
        <p>All your saved meal plans</p>
      </div>

      {loading ? (
        <div className="loading"><span className="spinner" /> Loading plans…</div>
      ) : plans.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><Icon name="calendar" size={28} /></div>
          <h3>No plans yet</h3>
          <p>Create your first plan in the Meal Planner.</p>
        </div>
      ) : (
        <div className="plans-list">
          {plans.map(plan => (
            <button key={plan.id} className="plan-row" onClick={() => onSelectPlan(plan.id)}>
              <div className="plan-row-badge">
                <span className="plan-row-id">Plan #{plan.id}</span>
                <span className="plan-row-count">{plan.meals?.length ?? 0} meal{plan.meals?.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="plan-row-info">
                <div className="plan-row-dates">{getDateRange(plan.meals)}</div>
                <div className="plan-row-preview">{getMealPreview(plan.meals)}</div>
              </div>
              <Icon name="chevron-right" size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
