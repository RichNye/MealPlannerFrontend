import { useState } from "react";
import { api } from "../api";
import Icon from "../components/Icon";

export default function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.fetch(
        mode === "login" ? "/login?useCookies=true" : "/register",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );
      if (res.ok) {
        if (mode === "register") {
          // auto-login after register
          const loginRes = await api.fetch("/login?useCookies=true", {
            method: "POST",
            body: JSON.stringify({ email, password }),
          });
          if (loginRes.ok) onLogin(email);
          else setError("Registered but couldn't log in automatically.");
        } else {
          onLogin(email);
        }
      } else {
        const body = await res.text();
        setError(body || (mode === "login" ? "Invalid credentials." : "Registration failed."));
      }
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-panel">
        <div className="auth-panel-content">
          <div className="auth-panel-logo">
            <div className="auth-panel-logo-icon"><Icon name="leaf" size={22} /></div>
            <span className="auth-panel-logo-text">MealPlanner</span>
          </div>
          <h1>Plan your week,<br /><em>nourish</em> your life.</h1>
          <p>A calm, organised space to build weekly meal plans from your personal recipe collection.</p>
          <div className="auth-decorations">
            <div className="auth-deco-card">
              <span className="num">7</span>
              <span className="lbl">Days planned</span>
            </div>
            <div className="auth-deco-card">
              <span className="num">∞</span>
              <span className="lbl">Recipes stored</span>
            </div>
          </div>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-box">
          <h2>{mode === "login" ? "Welcome back" : "Get started"}</h2>
          <p className="subtitle">
            {mode === "login" ? "Sign in to your account" : "Create a free account"}
          </p>
          {error && <div className="error-msg">{error}</div>}
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginTop: 8 }}>
              {loading ? <span className="spinner" /> : null}
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
          <div className="auth-toggle">
            {mode === "login" ? (
              <>Don't have an account? <button onClick={() => { setMode("register"); setError(""); }}>Register here</button></>
            ) : (
              <>Already have an account? <button onClick={() => { setMode("login"); setError(""); }}>Sign in</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
