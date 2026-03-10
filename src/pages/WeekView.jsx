import { addDays, getCurrentWeekBounds } from "../utils";

export default function WeekView({ meals, loading }) {
  const { monday } = getCurrentWeekBounds();
  const todayStr = new Date().toISOString().split("T")[0];
  const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const days = Array.from({ length: 7 }, (_, i) => {
    const dateStr = addDays(monday, i);
    // mealDate arrives as ISO string "2024-01-15T12:00:00Z" — compare on date part only
    const dayMeals = meals.filter(m => m.mealDate?.slice(0, 10) === dateStr);
    return { dateStr, dayMeals, name: DAY_NAMES[i] };
  });

  if (loading) return <div className="loading"><span className="spinner" /> Loading this week…</div>;

  return (
    <div className="week-grid">
      {days.map(({ dateStr, dayMeals, name }) => {
        const isToday = dateStr === todayStr;
        return (
          <div key={dateStr} className={`week-day${isToday ? " week-day--today" : ""}`}>
            <div className="week-day-header">
              <span className="week-day-name">{name}</span>
              <span className="week-day-num">{parseInt(dateStr.split("-")[2])}</span>
            </div>
            {dayMeals.length > 0
              ? dayMeals.map(m => (
                  <div key={m.id} className="week-day-meal">{m.mealName}</div>
                ))
              : <div className="week-day-empty">No meal</div>
            }
          </div>
        );
      })}
    </div>
  );
}
