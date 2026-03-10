import { useState, useCallback, useEffect } from "react";
import { api } from "../api";
import Icon from "../components/Icon";
import Modal from "../components/Modal";
import { fireToast } from "../components/Toast";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);

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

  const openAdd = () => {
    setForm({ name: "", description: "" });
    setEditRecipe(null);
    setShowAdd(true);
  };

  const openEdit = (r) => {
    setForm({ name: r.name, description: r.description || "" });
    setEditRecipe(r);
    setShowAdd(true);
  };

  const save = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editRecipe) {
        const res = await api.fetch(`/api/recipes/${editRecipe.id}`, {
          method: "PATCH",
          body: JSON.stringify({ name: form.name, description: form.description }),
        });
        if (res.ok) {
          fireToast("Recipe updated");
          setShowAdd(false);
          loadRecipes();
        } else fireToast("Update failed", "error");
      } else {
        const res = await api.fetch("/api/recipes", {
          method: "POST",
          body: JSON.stringify({ name: form.name, description: form.description }),
        });
        if (res.ok || res.status === 201) {
          fireToast("Recipe added");
          setShowAdd(false);
          loadRecipes();
        } else fireToast("Failed to add recipe", "error");
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteRecipe = async (id) => {
    if (!confirm("Delete this recipe?")) return;
    const res = await api.fetch(`/api/recipes/${id}`, { method: "DELETE" });
    if (res.ok) { fireToast("Recipe deleted"); loadRecipes(); }
    else fireToast("Delete failed", "error");
  };

  const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Recipes</h1>
            <p>Your personal recipe collection</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" onClick={loadRecipes}><Icon name="refresh" size={15} /> Refresh</button>
            <button className="btn btn-primary" onClick={openAdd}><Icon name="plus" size={15} /> Add Recipe</button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading"><span className="spinner" /> Loading recipes…</div>
      ) : recipes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><Icon name="book" size={28} /></div>
          <h3>No recipes yet</h3>
          <p>Add your first recipe to get started building your collection.</p>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={openAdd}><Icon name="plus" size={15} /> Add Recipe</button>
        </div>
      ) : (
        <div className="card-grid">
          {recipes.map((r) => (
            <div className="recipe-card" key={r.id}>
              <div className="recipe-card-header">
                <div className="recipe-name">{r.name}</div>
                <span className="tag tag-green">#{r.id}</span>
              </div>
              {r.description && <div className="recipe-desc">{r.description}</div>}
              <div className="recipe-meta">Added {fmtDate(r.createdDate)}</div>
              <div className="recipe-actions">
                <button className="icon-btn" onClick={() => openEdit(r)} title="Edit"><Icon name="edit" size={14} /></button>
                <button className="icon-btn danger" onClick={() => deleteRecipe(r.id)} title="Delete"><Icon name="trash" size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <Modal
          title={editRecipe ? "Edit Recipe" : "New Recipe"}
          onClose={() => setShowAdd(false)}
          actions={
            <>
              <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving || !form.name.trim()}>
                {saving ? <span className="spinner" /> : null}
                {editRecipe ? "Save changes" : "Add Recipe"}
              </button>
            </>
          }
        >
          <div className="form-group">
            <label>Recipe name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Spaghetti Bolognese"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="A brief description of the recipe…"
            />
          </div>
        </Modal>
      )}
    </>
  );
}
