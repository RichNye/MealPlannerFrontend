import { useState, useEffect } from "react";
import Icon from "./Icon";

let toastId = 0;
const toastListeners = [];

export const fireToast = (msg, type = "success") => {
  const id = ++toastId;
  toastListeners.forEach((fn) => fn({ id, msg, type }));
};

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    const fn = (t) => {
      setToasts((p) => [...p, t]);
      setTimeout(() => setToasts((p) => p.filter((x) => x.id !== t.id)), 3200);
    };
    toastListeners.push(fn);
    return () => {
      const i = toastListeners.indexOf(fn);
      if (i !== -1) toastListeners.splice(i, 1);
    };
  }, []);
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <Icon name={t.type === "success" ? "check" : "x"} size={15} />
          {t.msg}
        </div>
      ))}
    </div>
  );
}
