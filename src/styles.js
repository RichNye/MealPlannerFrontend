const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --sage-50:  #f4f7f4;
    --sage-100: #e6ede6;
    --sage-200: #ccdccc;
    --sage-300: #a8c3a8;
    --sage-400: #7fa47f;
    --sage-500: #5c875c;
    --sage-600: #486e48;
    --sage-700: #3a573a;
    --sage-800: #2f452f;
    --sage-900: #1e2e1e;
    --cream:    #faf8f3;
    --warm-100: #f5f0e8;
    --warm-200: #e8dece;
    --clay:     #c4845a;
    --clay-light: #d9a07a;
    --text-primary: #1e2e1e;
    --text-secondary: #4a5e4a;
    --text-muted: #7a9070;
    --border: #d4e2d4;
    --shadow-sm: 0 1px 3px rgba(30,46,30,0.08);
    --shadow-md: 0 4px 16px rgba(30,46,30,0.10);
    --shadow-lg: 0 12px 40px rgba(30,46,30,0.14);
    --radius: 12px;
    --radius-sm: 8px;
    --radius-lg: 20px;
    font-family: 'DM Sans', sans-serif;
  }

  html, body, #root { height: 100%; }

  body {
    background: var(--cream);
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ── AUTH SCREEN ── */
  .auth-screen {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    .auth-screen { grid-template-columns: 1fr; }
    .auth-panel { display: none; }
  }

  .auth-panel {
    background: var(--sage-700);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 64px;
    position: relative;
    overflow: hidden;
  }

  .auth-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 60% at 20% 20%, rgba(255,255,255,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(196,132,90,0.2) 0%, transparent 50%);
  }

  .auth-panel-content { position: relative; z-index: 1; }

  .auth-panel-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 64px;
    color: var(--sage-200);
  }

  .auth-panel-logo-icon {
    width: 42px; height: 42px;
    background: rgba(255,255,255,0.12);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sage-100);
  }

  .auth-panel-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: white;
    letter-spacing: -0.3px;
  }

  .auth-panel h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 4vw, 56px);
    line-height: 1.1;
    color: white;
    font-weight: 400;
    margin-bottom: 24px;
  }

  .auth-panel h1 em {
    color: var(--clay-light);
    font-style: italic;
  }

  .auth-panel p {
    color: var(--sage-300);
    font-size: 16px;
    line-height: 1.7;
    font-weight: 300;
    max-width: 380px;
  }

  .auth-decorations {
    display: flex;
    gap: 16px;
    margin-top: 56px;
  }

  .auth-deco-card {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius);
    padding: 20px;
    flex: 1;
    color: var(--sage-200);
  }

  .auth-deco-card .num {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: white;
    display: block;
  }

  .auth-deco-card .lbl {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--sage-400);
  }

  .auth-form-side {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    background: var(--cream);
  }

  .auth-form-box {
    width: 100%;
    max-width: 400px;
  }

  .auth-form-box h2 {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 400;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  .auth-form-box .subtitle {
    color: var(--text-muted);
    font-size: 14px;
    margin-bottom: 36px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  .form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    background: white;
    font-size: 15px;
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
  }

  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--sage-400);
    box-shadow: 0 0 0 3px rgba(127,164,127,0.15);
  }

  .form-group textarea { resize: vertical; min-height: 90px; }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    text-decoration: none;
  }

  .btn-primary {
    background: var(--sage-600);
    color: white;
  }

  .btn-primary:hover {
    background: var(--sage-700);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-primary:active { transform: translateY(0); }

  .btn-secondary {
    background: var(--sage-100);
    color: var(--sage-700);
    border: 1.5px solid var(--sage-200);
  }

  .btn-secondary:hover {
    background: var(--sage-200);
  }

  .btn-ghost {
    background: transparent;
    color: var(--text-secondary);
    border: 1.5px solid var(--border);
  }

  .btn-ghost:hover {
    background: var(--sage-50);
    border-color: var(--sage-300);
    color: var(--sage-700);
  }

  .btn-danger {
    background: #fee2e2;
    color: #b91c1c;
    border: 1.5px solid #fecaca;
  }

  .btn-danger:hover { background: #fecaca; }

  .btn-clay {
    background: var(--clay);
    color: white;
  }

  .btn-clay:hover {
    background: #b57348;
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-full { width: 100%; }

  .btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none !important;
  }

  .auth-toggle {
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
    color: var(--text-muted);
  }

  .auth-toggle button {
    background: none;
    border: none;
    color: var(--sage-600);
    cursor: pointer;
    font-weight: 500;
    text-decoration: underline;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
  }

  .error-msg {
    background: #fee2e2;
    color: #b91c1c;
    border-radius: var(--radius-sm);
    padding: 10px 14px;
    font-size: 13px;
    margin-bottom: 16px;
    border: 1px solid #fecaca;
  }

  /* ── APP SHELL ── */
  .app-shell {
    display: grid;
    grid-template-columns: 240px 1fr;
    min-height: 100vh;
  }

  @media (max-width: 900px) {
    .app-shell { grid-template-columns: 1fr; }
    .sidebar { display: none; }
    .topbar { display: flex; }
  }

  /* ── SIDEBAR ── */
  .sidebar {
    background: var(--sage-900);
    display: flex;
    flex-direction: column;
    padding: 28px 0;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 24px 32px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 16px;
  }

  .sidebar-logo-icon {
    width: 36px; height: 36px;
    background: var(--sage-600);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }

  .sidebar-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: white;
    letter-spacing: -0.2px;
  }

  .sidebar-nav {
    flex: 1;
    padding: 0 12px;
  }

  .nav-section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--sage-600);
    padding: 0 12px;
    margin: 16px 0 6px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    color: var(--sage-400);
    cursor: pointer;
    transition: all 0.12s;
    font-size: 14px;
    font-weight: 400;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 2px;
  }

  .nav-item:hover {
    background: rgba(255,255,255,0.06);
    color: var(--sage-200);
  }

  .nav-item.active {
    background: var(--sage-700);
    color: white;
  }

  .nav-item.active svg { color: var(--sage-300); }

  .sidebar-footer {
    padding: 16px 12px 0;
    border-top: 1px solid rgba(255,255,255,0.06);
    margin-top: 16px;
  }

  .user-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    margin-bottom: 6px;
  }

  .user-avatar {
    width: 32px; height: 32px;
    background: var(--sage-600);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: white;
    flex-shrink: 0;
  }

  .user-name {
    font-size: 13px;
    color: var(--sage-300);
    font-weight: 400;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── MAIN CONTENT ── */
  .main-content {
    background: var(--cream);
    overflow-y: auto;
    padding: 40px 48px;
    min-height: 100vh;
  }

  /* Lock height when planner is active — no page scroll */
  .main-content--locked {
    overflow: hidden;
    height: 100vh;
    min-height: unset;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1100px) {
    .main-content { padding: 32px 28px; }
  }

  .page-header {
    margin-bottom: 36px;
  }

  .page-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 400;
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  .page-header p {
    color: var(--text-muted);
    font-size: 15px;
  }

  .page-header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  /* ── CARDS ── */
  .card {
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow-sm);
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 8px;
  }

  .recipe-card {
    background: white;
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 22px;
    box-shadow: var(--shadow-sm);
    transition: all 0.18s;
    cursor: default;
    position: relative;
    overflow: hidden;
  }

  .recipe-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--sage-400), var(--sage-300));
    opacity: 0;
    transition: opacity 0.18s;
  }

  .recipe-card:hover {
    border-color: var(--sage-300);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .recipe-card:hover::before { opacity: 1; }

  .recipe-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 10px;
  }

  .recipe-name {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1.3;
  }

  .recipe-desc {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 16px;
  }

  .recipe-meta {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 400;
  }

  .recipe-actions {
    display: flex;
    gap: 8px;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid var(--sage-50);
  }

  .icon-btn {
    width: 32px; height: 32px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-muted);
    transition: all 0.12s;
    flex-shrink: 0;
  }

  .icon-btn:hover {
    background: var(--sage-50);
    color: var(--sage-600);
    border-color: var(--sage-300);
  }

  .icon-btn.danger:hover {
    background: #fee2e2;
    color: #b91c1c;
    border-color: #fecaca;
  }

  /* ── DASHBOARD ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 36px;
  }

  .stat-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px 24px;
    box-shadow: var(--shadow-sm);
  }

  .stat-card .label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .stat-card .value {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1;
  }

  .stat-card .sub {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 6px;
  }

  .stat-card .icon-badge {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }

  /* ── WEEK CALENDAR ── */
  .week-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
  }

  @media (max-width: 900px) {
    .week-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .day-cell {
    background: white;
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 14px;
    min-height: 120px;
    transition: border-color 0.15s;
  }

  .day-cell.today {
    border-color: var(--sage-400);
    background: var(--sage-50);
  }

  .day-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 4px;
  }

  .day-date {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: var(--text-primary);
    margin-bottom: 10px;
  }

  .day-cell.today .day-date { color: var(--sage-600); }

  .meal-chip {
    background: var(--sage-100);
    color: var(--sage-700);
    border: 1px solid var(--sage-200);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 500;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
  }

  .meal-chip .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }

  .meal-chip .del {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--sage-500);
    padding: 0;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .meal-chip .del:hover { color: #b91c1c; }

  .add-meal-btn {
    width: 100%;
    background: none;
    border: 1.5px dashed var(--sage-200);
    border-radius: 6px;
    padding: 5px;
    color: var(--sage-400);
    cursor: pointer;
    font-size: 11px;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: 4px;
    transition: all 0.12s;
  }

  .add-meal-btn:hover {
    border-color: var(--sage-400);
    color: var(--sage-600);
    background: var(--sage-50);
  }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 24px;
    backdrop-filter: blur(3px);
    animation: fadeIn 0.15s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .modal {
    background: white;
    border-radius: var(--radius-lg);
    padding: 32px;
    width: 100%;
    max-width: 480px;
    box-shadow: var(--shadow-lg);
    animation: slideUp 0.2s ease;
  }

  @keyframes slideUp {
    from { transform: translateY(16px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .modal-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 400;
    color: var(--text-primary);
  }

  .modal-close {
    width: 32px; height: 32px;
    background: var(--sage-50);
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-muted);
    transition: all 0.12s;
  }

  .modal-close:hover {
    background: var(--sage-100);
    color: var(--text-primary);
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 24px;
  }

  /* ── TOPBAR (mobile) ── */
  .topbar {
    display: none;
    background: var(--sage-900);
    padding: 14px 20px;
    align-items: center;
    justify-content: space-between;
  }

  /* ── EMPTY STATE ── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 64px 24px;
    text-align: center;
    color: var(--text-muted);
  }

  .empty-icon {
    width: 64px; height: 64px;
    background: var(--sage-100);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sage-400);
    margin-bottom: 20px;
  }

  .empty-state h3 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 400;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  .empty-state p {
    font-size: 14px;
    max-width: 300px;
    line-height: 1.6;
  }

  /* ── TOAST ── */
  .toast-container {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 200;
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer-events: none;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-weight: 400;
    box-shadow: var(--shadow-lg);
    animation: toastIn 0.2s ease;
    pointer-events: auto;
    max-width: 320px;
  }

  @keyframes toastIn {
    from { transform: translateX(40px); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }

  .toast.success {
    background: var(--sage-700);
    color: white;
  }

  .toast.error {
    background: #b91c1c;
    color: white;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2px;
  }

  .tag-green {
    background: var(--sage-100);
    color: var(--sage-700);
  }

  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 24px 0;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 400;
    color: var(--text-primary);
    margin-bottom: 16px;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    color: var(--text-muted);
    font-size: 14px;
    gap: 10px;
  }

  .spinner {
    width: 20px; height: 20px;
    border: 2px solid var(--sage-200);
    border-top-color: var(--sage-500);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  select option { font-family: 'DM Sans', sans-serif; }

  /* ── PLANNER ── */
  .planner-filters { margin-bottom: 28px; }

  .planner-filters-inner {
    display: flex;
    gap: 20px;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  .planner-filters-inner .form-group {
    flex: 1;
    min-width: 160px;
    margin-bottom: 0;
  }

  /* Planner flex chain — each level must carry flex: 1; min-height: 0
     so the scroll containers fill the remaining viewport height exactly */
  .planner-page {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .planner-body {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .planner-section {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .planner-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    gap: 12px;
  }

  .picker-search {
    padding: 8px 14px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: var(--text-primary);
    background: white;
    outline: none;
    width: 220px;
  }

  .picker-search:focus {
    border-color: var(--sage-400);
    box-shadow: 0 0 0 3px rgba(127,164,127,0.15);
  }

  .staged-scroll,
  .picker-scroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-right: 4px;
  }

  .staged-scroll::-webkit-scrollbar,
  .picker-scroll::-webkit-scrollbar { width: 6px; }
  .staged-scroll::-webkit-scrollbar-track,
  .picker-scroll::-webkit-scrollbar-track { background: transparent; }
  .staged-scroll::-webkit-scrollbar-thumb,
  .picker-scroll::-webkit-scrollbar-thumb {
    background: var(--sage-200);
    border-radius: 3px;
  }
  .staged-scroll::-webkit-scrollbar-thumb:hover,
  .picker-scroll::-webkit-scrollbar-thumb:hover { background: var(--sage-300); }

  .picker-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }

  .picker-card {
    background: white;
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 16px 16px 42px;
    cursor: pointer;
    text-align: left;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
    width: 100%;
    position: relative;
  }

  .picker-card:hover {
    border-color: var(--sage-300);
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }

  .picker-card.selected {
    border-color: var(--sage-500);
    background: var(--sage-50);
  }

  .picker-card-check {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 18px; height: 18px;
    border: 2px solid var(--border);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    color: white;
    transition: all 0.12s;
    flex-shrink: 0;
  }

  .picker-card.selected .picker-card-check {
    background: var(--sage-600);
    border-color: var(--sage-600);
  }

  .picker-card-name {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    color: var(--text-primary);
    line-height: 1.3;
    margin-bottom: 4px;
  }

  .picker-card-desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .staged-list { display: flex; flex-direction: column; gap: 8px; }

  .staged-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px 16px;
  }

  .staged-item-num {
    width: 24px; height: 24px;
    background: var(--sage-100);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: var(--sage-700);
    flex-shrink: 0;
  }

  .staged-item-name {
    flex: 1;
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    color: var(--text-primary);
  }

  .staged-date-input {
    padding: 6px 10px;
    border: 1.5px solid var(--border);
    border-radius: 6px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: var(--text-secondary);
    background: white;
    outline: none;
    cursor: pointer;
  }

  .staged-date-input:focus {
    border-color: var(--sage-400);
    box-shadow: 0 0 0 3px rgba(127,164,127,0.15);
  }

  .plan-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px; height: 22px;
    background: var(--sage-600);
    color: white;
    border-radius: 50%;
    font-size: 11px;
    font-weight: 600;
    margin-left: 8px;
    font-family: 'DM Sans', sans-serif;
    vertical-align: middle;
  }

  /* ── PROFILE PAGE ── */
  .profile-stack {
    max-width: 580px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .profile-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 400;
    color: var(--text-primary);
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }

  .profile-field-row { margin-bottom: 4px; }

  .profile-field-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 6px;
  }

  .profile-field-value {
    font-size: 15px;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 8px;
    border-radius: 99px;
    font-family: 'DM Sans', sans-serif;
  }

  .badge-success { background: var(--sage-100); color: var(--sage-700); }
  .badge-warning { background: #fef3c7; color: #92400e; }

  .profile-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 20px 0;
  }

  .profile-sub-title {
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  .profile-hint {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.6;
    margin-top: 8px;
  }

  .profile-hint code {
    font-family: 'SFMono-Regular', Consolas, monospace;
    font-size: 12px;
    background: var(--sage-50);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 5px;
    color: var(--sage-700);
  }

  /* ── WEEK VIEW (Dashboard) ── */
  .week-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }

  @media (max-width: 1200px) { .week-grid { grid-template-columns: repeat(4, 1fr); } }
  @media (max-width: 700px)  { .week-grid { grid-template-columns: repeat(2, 1fr); } }

  .week-day {
    background: white;
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 14px;
    min-height: 110px;
  }

  .week-day--today {
    border-color: var(--sage-500);
    background: var(--sage-50);
    box-shadow: 0 0 0 3px rgba(92,135,92,0.1);
  }

  .week-day-header {
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }

  .week-day--today .week-day-header { border-bottom-color: var(--sage-200); }

  .week-day-name {
    display: block;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--text-muted);
  }

  .week-day--today .week-day-name { color: var(--sage-600); }

  .week-day-num {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: var(--text-primary);
    line-height: 1.1;
  }

  .week-day--today .week-day-num { color: var(--sage-700); font-weight: 600; }

  .week-day-meal {
    font-size: 13px;
    color: var(--text-primary);
    line-height: 1.4;
    padding: 3px 0;
  }

  .week-day--today .week-day-meal { font-weight: 500; }

  .week-day-empty {
    font-size: 12px;
    color: var(--text-muted);
    font-style: italic;
    padding-top: 2px;
  }

  /* ── PLANS LIST PAGE ── */
  .plans-list { display: flex; flex-direction: column; gap: 10px; }

  .plan-row {
    background: white;
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.15s;
    width: 100%;
    text-align: left;
    font-family: 'DM Sans', sans-serif;
    color: var(--text-primary);
  }

  .plan-row:hover {
    border-color: var(--sage-300);
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }

  .plan-row-badge { flex-shrink: 0; min-width: 80px; }

  .plan-row-id {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: var(--text-primary);
  }

  .plan-row-count {
    display: block;
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .plan-row-info { flex: 1; min-width: 0; }

  .plan-row-dates {
    font-size: 13px;
    color: var(--sage-600);
    font-weight: 500;
    margin-bottom: 3px;
  }

  .plan-row-preview {
    font-size: 13px;
    color: var(--text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── PLAN DETAIL PAGE ── */
  .back-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 0;
    margin-bottom: 4px;
  }

  .back-btn:hover { color: var(--sage-700); }

  .plan-meal-table { display: flex; flex-direction: column; gap: 8px; }

  .plan-meal-row {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px 16px;
  }

  .plan-meal-row--today {
    border-color: var(--sage-400);
    background: var(--sage-50);
  }

  .plan-recipe-select {
    flex: 1;
    min-width: 0;
    padding: 7px 10px;
    border: 1.5px solid var(--border);
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Playfair Display', serif;
    color: var(--text-primary);
    background: white;
    outline: none;
    cursor: pointer;
  }

  .plan-recipe-select:focus {
    border-color: var(--sage-400);
    box-shadow: 0 0 0 3px rgba(127,164,127,0.15);
  }

  .delete-zone {
    border: 1.5px dashed #fca5a5;
    border-radius: var(--radius);
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .delete-zone p { font-size: 13px; color: var(--text-muted); margin-top: 4px; }

  /* User badge — make it a clickable button */
  button.user-badge {
    border: none;
    background: none;
    width: 100%;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.12s;
    text-align: left;
  }

  button.user-badge:hover { background: rgba(255,255,255,0.06); }
  button.user-badge.active { background: var(--sage-700); }
`;

export default styles;
