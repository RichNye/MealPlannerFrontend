export const addDays = (dateStr, days) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

// Returns ISO date strings for the Monday and Sunday of the current week
export const getCurrentWeekBounds = () => {
  const now = new Date();
  const day = now.getDay(); // 0=Sun … 6=Sat
  const daysToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + daysToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    monday: monday.toISOString().split("T")[0],
    sunday: sunday.toISOString().split("T")[0],
  };
};

// "2024-01-15" → "15 Jan"  (avoids timezone shifts by parsing manually)
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const parts = dateStr.slice(0, 10).split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(parts[2])} ${months[parseInt(parts[1]) - 1]}`;
};
