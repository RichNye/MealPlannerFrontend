import { useState, useEffect } from "react";
import { api } from "../api";
import Icon from "../components/Icon";
import { fireToast } from "../components/Toast";

export default function ProfilePage({ userName }) {
  const [info, setInfo]               = useState(null);
  const [infoLoading, setInfoLoading] = useState(true);

  // Change email state
  const [newEmail, setNewEmail]       = useState("");
  const [emailSaving, setEmailSaving] = useState(false);

  // Change password state
  const [oldPass, setOldPass]         = useState("");
  const [newPass, setNewPass]         = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passSaving, setPassSaving]   = useState(false);

  useEffect(() => {
    api.fetch("/manage/info").then(async (r) => {
      if (r.ok) setInfo(await r.json());
      setInfoLoading(false);
    });
  }, []);

  // Parse ASP.NET Identity validation errors: { errors: { Field: ["msg"] } }
  // or { detail: "..." } / { title: "..." }
  const parseIdentityError = async (r) => {
    try {
      const body = await r.json();
      const errs = body?.errors;
      if (errs) {
        const first = Object.values(errs).flat()[0];
        if (first) return first;
      }
      return body?.detail || body?.title || "Something went wrong";
    } catch {
      return "Something went wrong";
    }
  };

  const saveEmail = async (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setEmailSaving(true);
    try {
      const r = await api.fetch("/manage/info", {
        method: "POST",
        body: JSON.stringify({ newEmail: newEmail.trim() }),
      });
      if (r.ok) {
        setInfo((p) => ({ ...p, email: newEmail.trim(), isEmailConfirmed: false }));
        fireToast("Email updated — sign out and back in to reflect the change");
        setNewEmail("");
      } else {
        fireToast(await parseIdentityError(r), "error");
      }
    } finally {
      setEmailSaving(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      fireToast("New passwords do not match", "error");
      return;
    }
    setPassSaving(true);
    try {
      const r = await api.fetch("/manage/info", {
        method: "POST",
        body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass }),
      });
      if (r.ok) {
        fireToast("Password changed successfully");
        setOldPass(""); setNewPass(""); setConfirmPass("");
      } else {
        fireToast(await parseIdentityError(r), "error");
      }
    } finally {
      setPassSaving(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Profile</h1>
        <p>Manage your account details and security</p>
      </div>

      {infoLoading ? (
        <div className="loading"><span className="spinner" /> Loading…</div>
      ) : (
        <div className="profile-stack">

          {/* ── Account / Email ── */}
          <div className="card">
            <h2 className="profile-card-title">Account</h2>

            <div className="profile-field-row">
              <div className="profile-field-label">Email address</div>
              <div className="profile-field-value">
                {info?.email ?? userName}
                {info?.isEmailConfirmed
                  ? <span className="badge badge-success"><Icon name="check" size={11} /> Verified</span>
                  : <span className="badge badge-warning">Unverified</span>
                }
              </div>
            </div>

            <hr className="profile-divider" />
            <p className="profile-sub-title">Change email</p>

            <form onSubmit={saveEmail}>
              <div className="form-group">
                <label>New email address</label>
                <input
                  type="email"
                  placeholder="new@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={emailSaving || !newEmail.trim()}
              >
                {emailSaving ? <span className="spinner" /> : <Icon name="check" size={15} />}
                Save email
              </button>
            </form>
          </div>

          {/* ── Security / Password ── */}
          <div className="card">
            <h2 className="profile-card-title">Security</h2>
            <p className="profile-sub-title">Change password</p>

            <form onSubmit={savePassword}>
              <div className="form-group">
                <label>Current password</label>
                <input
                  type="password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <div className="form-group">
                <label>New password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group">
                <label>Confirm new password</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={passSaving || !oldPass || !newPass || !confirmPass}
              >
                {passSaving ? <span className="spinner" /> : <Icon name="check" size={15} />}
                Change password
              </button>
            </form>
          </div>

          {/* ── Display name — requires custom API endpoint ── */}
          <div className="card">
            <h2 className="profile-card-title">Display name</h2>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Name</label>
              <input
                type="text"
                value={userName}
                disabled
                style={{ cursor: "not-allowed", opacity: 0.55 }}
              />
            </div>
            <p className="profile-hint">
              Changing your display name requires a custom <code>PATCH /me/name</code> endpoint on the API —
              it's not included in <code>MapIdentityApi</code>. Currently your name is taken from your
              username at registration.
            </p>
          </div>

        </div>
      )}
    </>
  );
}
