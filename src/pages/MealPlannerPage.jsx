import { useState, useCallback, useEffect } from "react";
import { api } from "../api";
import Icon from "../components/Icon";
import { fireToast } from "../components/Toast";
import { addDays } from "../utils";

export default function MealPlannerPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [staged, setStaged] = useState([]); // [{ recipeId, recipeName, mealDate }]
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [mealCount, setMealCount] = useState(7);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.fetch("/api/recipes");
      if (res.ok) setRecipes(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadRecipes(); }, [loadRecipes]);

  // Re-sequence all staged dates when startDate changes
  useEffect(() => {
    setStaged(prev => prev.map((item, i) => ({ ...item, mealDate: addDays(startDate, i) })));
  }, [startDate]);

  const stagedIds = new Set(staged.map(s => s.recipeId));

  const filteredRecipes = search.trim()
    ? recipes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
    : recipes;

  const toggleRecipe = (recipe) => {
    if (stagedIds.has(recipe.id)) {
      setStaged(prev => {
        const next = prev.filter(s => s.recipeId !== recipe.id);
        return next.map((item, i) => ({ ...item, mealDate: addDays(startDate, i) }));
      });
    } else {
      setStaged(prev => [
        ...prev,
        { recipeId: recipe.id, recipeName: recipe.name, mealDate: addDays(startDate, prev.length) },
      ]);
    }
  };

  const removeStaged = (index) => {
    setStaged(prev => {
      const next = prev.filter((_, i) => i !== index);
      return next.map((item, i) => ({ ...item, mealDate: addDays(startDate, i) }));
    });
  };

  const updateStagedDate = (index, date) => {
    setStaged(prev => prev.map((item, i) => i === index ? { ...item, mealDate: date } : item));
  };

  const suggest = () => {
    const remaining = mealCount - staged.length;
    if (remaining <= 0) {
      // At or over capacity — replace all
      const picks = [...recipes].sort(() => Math.random() - 0.5).slice(0, mealCount);
      setStaged(picks.map((r, i) => ({ recipeId: r.id, recipeName: r.name, mealDate: addDays(startDate, i) })));
    } else {
      // Top up with random unstaged recipes to reach mealCount
      const available = recipes.filter(r => !stagedIds.has(r.id));
      const picks = available.sort(() => Math.random() - 0.5).slice(0, remaining);
      setStaged(prev => [
        ...prev,
        ...picks.map((r, i) => ({ recipeId: r.id, recipeName: r.name, mealDate: addDays(startDate, prev.length + i) })),
      ]);
    }
  };

  const suggestLabel = staged.length === 0
    ? "Suggest for me"
    : staged.length < mealCount
    ? `Fill remaining ${mealCount - staged.length}`
    : "Randomise";

  const canSuggest = !loading && recipes.length > 0 &&
    (staged.length === 0 || staged.length >= mealCount || recipes.some(r => !stagedIds.has(r.id)));

  const savePlan = async () => {
    if (staged.length === 0) return;
    setSaving(true);
    try {
      // Step 1 — create each meal individually, collect the responses
      const mealResponses = await Promise.all(
        staged.map(s => api.fetch("/api/meals", {
          method: "POST",
          body: JSON.stringify({ recipeId: s.recipeId, mealDate: s.mealDate + "T12:00:00Z" }),
        }))
      );

      if (!mealResponses.every(r => r.ok)) {
        fireToast("Some meals failed to save", "error");
        return;
      }

      // Step 2 — parse the returned Meal objects to get their IDs
      const createdMeals = await Promise.all(mealResponses.map(r => r.json()));
      const mealIds = createdMeals.map(m => m.id);

      // Step 3 — create the MealPlan, linking all meals in one go
      const planRes = await api.fetch("/api/mealplans", {
        method: "POST",
        body: JSON.stringify(mealIds),
      });

      if (planRes.ok) {
        const plan = await planRes.json();
        fireToast(`Plan #${plan.mealPlanId} saved — ${staged.length} meal${staged.length !== 1 ? "s" : ""} added`);
        setStaged([]);
      } else {
        fireToast("Meals created but plan could not be saved", "error");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="planner-page">
      <div className="page-header">
        <h1>Meal Planner</h1>
        <p>Build your week's meals</p>
      </div>

      {/* Filters bar */}
      <div className="card planner-filters">
        <div className="planner-filters-inner">
          <div className="form-group">
            <label>Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Number of meals</label>
            <input
              type="number"
              min={1}
              max={99}
              value={mealCount}
              onChange={(e) => setMealCount(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button className="btn btn-clay" onClick={suggest} disabled={!canSuggest}>
              <Icon name="refresh" size={15} />
              {suggestLabel}
            </button>
          </div>
        </div>
      </div>

      <div className="planner-body">
        {/* Staged plan */}
        <div className="planner-section">
          <div className="planner-section-header">
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Your plan
              {staged.length > 0 && <span className="plan-count">{staged.length}</span>}
            </h2>
            {staged.length > 0 && (
              <button className="btn btn-primary" onClick={savePlan} disabled={saving}>
                {saving ? <span className="spinner" /> : <Icon name="check" size={15} />}
                Save plan
              </button>
            )}
          </div>
          {staged.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "32px 24px" }}>
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
                Select recipes below to add them to your plan, or use <strong>Suggest for me</strong> to auto-fill.
              </p>
            </div>
          ) : (
            <div className="staged-scroll">
              <div className="staged-list">
                {staged.map((item, i) => (
                  <div key={item.recipeId} className="staged-item">
                    <div className="staged-item-num">{i + 1}</div>
                    <div className="staged-item-name">{item.recipeName}</div>
                    <input
                      type="date"
                      className="staged-date-input"
                      value={item.mealDate}
                      onChange={(e) => updateStagedDate(i, e.target.value)}
                    />
                    <button className="icon-btn danger" onClick={() => removeStaged(i)} title="Remove">
                      <Icon name="x" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recipe picker */}
        <div className="planner-section">
          <div className="planner-section-header">
            <h2 className="section-title" style={{ marginBottom: 0 }}>Choose recipes</h2>
            <input
              className="picker-search"
              type="text"
              placeholder="Search recipes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="loading"><span className="spinner" /> Loading recipes…</div>
          ) : filteredRecipes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><Icon name="book" size={28} /></div>
              <h3>{search ? "No matches" : "No recipes yet"}</h3>
              <p>{search ? `No recipes match "${search}"` : "Add some recipes first before building a plan."}</p>
            </div>
          ) : (
            <div className="picker-scroll">
              <div className="picker-grid">
                {filteredRecipes.map(r => {
                  const selected = stagedIds.has(r.id);
                  return (
                    <button
                      key={r.id}
                      className={`picker-card${selected ? " selected" : ""}`}
                      onClick={() => toggleRecipe(r)}
                    >
                      <div className="picker-card-check">
                        {selected && <Icon name="check" size={12} />}
                      </div>
                      <div className="picker-card-name">{r.name}</div>
                      {r.description && <div className="picker-card-desc">{r.description}</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
