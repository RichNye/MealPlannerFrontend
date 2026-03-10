import { useState, useEffect } from "react";
import { api } from "../api";
import Icon from "../components/Icon";
import { fireToast } from "../components/Toast";

export default function MealPlanDetailPage({ planId, onBack }) {
  const [plan, setPlan]         = useState(null);
  const [recipes, setRecipes]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [confirmDel, setConfirmDel] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setConfirmDel(false);
    Promise.all([
      api.fetch(`/api/mealplans/${planId}`).then(r => r.ok ? r.json() : null),
      api.fetch("/api/recipes").then(r => r.ok ? r.json() : []),
    ]).then(([p, recs]) => {
      setPlan(p);
      setRecipes(recs);
      setLoading(false);
    });
  }, [planId]);

  const todayStr = new Date().toISOString().split("T")[0];

  const updateMealDate = async (mealId, newDate) => {
    const meal = plan.meals.find(m => m.id === mealId);
    const r = await api.fetch(`/api/meals/${mealId}`, {
      method: "PATCH",
      body: JSON.stringify({ recipeId: meal.recipeId, mealDate: newDate + "T12:00:00Z" }),
    });
    if (r.ok) {
      setPlan(p => ({
        ...p,
        meals: p.meals.map(m => m.id === mealId ? { ...m, mealDate: newDate + "T12:00:00Z" } : m),
      }));
      fireToast("Date updated");
    } else {
      fireToast("Failed to update date", "error");
    }
  };

  const updateMealRecipe = async (mealId, newRecipeId) => {
    const rid = parseInt(newRecipeId);
    const recipe = recipes.find(r => r.id === rid);
    const meal = plan.meals.find(m => m.id === mealId);
    const r = await api.fetch(`/api/meals/${mealId}`, {
      method: "PATCH",
      body: JSON.stringify({ recipeId: rid, mealDate: meal.mealDate }),
    });
    if (r.ok) {
      setPlan(p => ({
        ...p,
        meals: p.meals.map(m => m.id === mealId
          ? { ...m, recipeId: rid, mealName: recipe?.name ?? m.mealName }
          : m
        ),
      }));
      fireToast("Recipe updated");
    } else {
      fireToast("Failed to update recipe", "error");
    }
  };

  const removeMeal = async (mealId) => {
    const r = await api.fetch(`/api/meals/${mealId}`, { method: "DELETE" });
    if (r.ok) {
      setPlan(p => ({ ...p, meals: p.meals.filter(m => m.id !== mealId) }));
      fireToast("Meal removed from plan");
    } else {
      fireToast("Failed to remove meal", "error");
    }
  };

  const deletePlan = async () => {
    setDeleting(true);
    const r = await api.fetch(`/api/mealplans/${planId}`, { method: "DELETE" });
    if (r.ok) {
      fireToast(`Plan #${planId} deleted`);
      onBack();
    } else {
      fireToast("Failed to delete plan", "error");
      setDeleting(false);
    }
  };

  if (loading) return <div className="loading"><span className="spinner" /> Loading plan…</div>;

  if (!plan) return (
    <>
      <button className="back-btn" onClick={onBack}>
        <Icon name="chevron-left" size={14} /> Back to plans
      </button>
      <div className="empty-state" style={{ marginTop: 24 }}>
        <h3>Plan not found</h3>
        <p>This plan may have been deleted.</p>
      </div>
    </>
  );

  const sortedMeals = [...(plan.meals ?? [])].sort((a, b) =>
    (a.mealDate ?? "").localeCompare(b.mealDate ?? "")
  );

  return (
    <>
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          <Icon name="chevron-left" size={14} /> Back to plans
        </button>
        <h1 style={{ marginTop: 8 }}>Plan #{plan.id}</h1>
        <p>{sortedMeals.length} meal{sortedMeals.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h2 className="profile-card-title">Meals</h2>
        {sortedMeals.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            No meals in this plan. They may have been removed individually.
          </p>
        ) : (
          <div className="plan-meal-table">
            {sortedMeals.map((meal, i) => {
              const isToday = meal.mealDate?.slice(0, 10) === todayStr;
              return (
                <div key={meal.id} className={`plan-meal-row${isToday ? " plan-meal-row--today" : ""}`}>
                  <div className="staged-item-num">{i + 1}</div>
                  {/* Recipe select — all recipes loaded; current meal shown as fallback if deleted */}
                  <select
                    className="plan-recipe-select"
                    value={meal.recipeId}
                    onChange={e => updateMealRecipe(meal.id, e.target.value)}
                  >
                    {!recipes.find(r => r.id === meal.recipeId) && (
                      <option value={meal.recipeId}>{meal.mealName}</option>
                    )}
                    {recipes.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    className="staged-date-input"
                    value={meal.mealDate?.slice(0, 10) ?? ""}
                    onChange={e => updateMealDate(meal.id, e.target.value)}
                  />
                  <button
                    className="icon-btn danger"
                    onClick={() => removeMeal(meal.id)}
                    title="Remove meal"
                  >
                    <Icon name="trash" size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div className="delete-zone">
        <div>
          <strong>Delete this plan</strong>
          <p>Removes the meal plan record. Individual meals remain in the database
             unless you delete them separately.</p>
        </div>
        {confirmDel ? (
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button className="btn btn-ghost" onClick={() => setConfirmDel(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={deletePlan} disabled={deleting}>
              {deleting ? <span className="spinner" /> : <Icon name="trash" size={15} />}
              Yes, delete
            </button>
          </div>
        ) : (
          <button className="btn btn-danger" style={{ flexShrink: 0 }} onClick={() => setConfirmDel(true)}>
            <Icon name="trash" size={15} /> Delete plan
          </button>
        )}
      </div>
    </>
  );
}
