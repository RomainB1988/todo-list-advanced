import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";

export default function CalendarView({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tasksForSelectedDate = tasks.filter((task) => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate).toDateString() === selectedDate.toDateString();
  });

  return (
    <motion.div className="w-full max-w-lg p-4 bg-white dark:bg-gray-800 rounded-lg shadow mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📅 Vue Calendrier</h2>

      <Calendar onChange={setSelectedDate} value={selectedDate} className="rounded-lg w-full shadow" />

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tâches du {selectedDate.toLocaleDateString("fr-FR")}</h3>
        {tasksForSelectedDate.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Aucune tâche prévue.</p>
        ) : (
          <ul className="mt-2">
            {tasksForSelectedDate.map((task) => (
              <li key={task.id} className="bg-gray-200 dark:bg-gray-700 p-2 rounded mb-2">
                {task.text} {task.priority === "high" ? "🔴" : task.priority === "medium" ? "🟠" : "🟢"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
