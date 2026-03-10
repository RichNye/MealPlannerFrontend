import { useState, useEffect } from "react";
import { api } from "./api";
import styles from "./styles";
import Icon from "./components/Icon";
import { ToastContainer } from "./components/Toast";
import AuthScreen from "./pages/AuthScreen";
import DashboardPage from "./pages/DashboardPage";
import RecipesPage from "./pages/RecipesPage";
import MealPlannerPage from "./pages/MealPlannerPage";
import MealPlansPage from "./pages/MealPlansPage";
import MealPlanDetailPage from "./pages/MealPlanDetailPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const [authed, setAuthed]                 = useState(null); // null=checking, false=no, string=username
  const [page, setPage]                     = useState("dashboard");
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const goToPlan = (id) => { setSelectedPlanId(id); setPage("plan-detail"); };

  // Check existing session
  useEffect(() => {
    api.fetch("/me").then(async (r) => {
      if (r.ok) {
        const data = await r.json();
        if (data.isAuthenticated) setAuthed(data.name || "user");
        else setAuthed(false);
      } else setAuthed(false);
    }).catch(() => setAuthed(false));
  }, []);

  const logout = async () => {
    await api.fetch("/me/logout", { method: "POST" });
    setAuthed(false);
  };

  if (authed === null) {
    return (
      <>
        <style>{styles}</style>
        <div className="loading" style={{ minHeight: "100vh" }}>
          <span className="spinner" /> Checking session…
        </div>
      </>
    );
  }

  if (authed === false) {
    return (
      <>
        <style>{styles}</style>
        <AuthScreen onLogin={(email) => setAuthed(email)} />
        <ToastContainer />
      </>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard",    icon: "leaf" },
    { id: "recipes",   label: "Recipes",      icon: "book" },
    { id: "planner",   label: "Meal Planner", icon: "calendar" },
    { id: "plans",     label: "Meal Plans",   icon: "list" },
    { id: "profile",   label: "Profile",      icon: "user" },
  ];

  // "plan-detail" is a sub-view of "plans" — keep "Meal Plans" highlighted
  const activeNav = page === "plan-detail" ? "plans" : page;

  return (
    <>
      <style>{styles}</style>
      <div className="app-shell">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon"><Icon name="leaf" size={18} /></div>
            <span className="sidebar-logo-text">MealPlanner</span>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section-label">Menu</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeNav === item.id ? "active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <button
              className={`user-badge${activeNav === "profile" ? " active" : ""}`}
              onClick={() => setPage("profile")}
              title="Manage profile"
            >
              <div className="user-avatar">
                {(authed || "U").slice(0, 1).toUpperCase()}
              </div>
              <span className="user-name">{authed}</span>
            </button>
            <button className="nav-item" onClick={logout}>
              <Icon name="logout" size={16} />
              Sign out
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className={`main-content${page === "planner" ? " main-content--locked" : ""}`}>
          {page === "dashboard"   && <DashboardPage userName={authed} />}
          {page === "recipes"     && <RecipesPage />}
          {page === "planner"     && <MealPlannerPage />}
          {page === "plans"       && <MealPlansPage onSelectPlan={goToPlan} />}
          {page === "plan-detail" && <MealPlanDetailPage planId={selectedPlanId} onBack={() => setPage("plans")} />}
          {page === "profile"     && <ProfilePage userName={authed} />}
        </main>
      </div>
      <ToastContainer />
    </>
  );
}
