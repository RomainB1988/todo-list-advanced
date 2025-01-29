import { motion } from "framer-motion";

export default function TodoItem({ task, toggleTask, deleteTask }) {
  const categoryIcons = {
    work: "✅ Travail",
    home: "🏠 Maison",
    studies: "🎓 Études",
    shopping: "🛒 Courses",
    other: "🎯 Autres",
  };

  return (
    <motion.div
      className={`flex flex-col p-2 border-b rounded-lg transition-all duration-300`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <span
          onClick={() => toggleTask(task.id)}
          className={`flex-1 cursor-pointer transition-all ${
            task.completed ? "line-through text-gray-400 opacity-50" : ""
          }`}
        >
          {task.text}
        </span>
        <motion.button
          onClick={() => deleteTask(task.id)}
          className="text-red-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ❌
        </motion.button>
      </div>

      {/* ✅ Affichage de la date et de l’heure d’échéance */}
      {task.dueDate && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          📅 {new Date(task.dueDate).toLocaleDateString("fr-FR")} | 🕒 {new Date(task.dueDate).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}
        </p>
      )}

      {/* ✅ Affichage de la priorité */}
      <p className="text-sm mt-1">
        {task.priority === "high" ? "🔴 Haute Priorité" : task.priority === "medium" ? "🟠 Priorité Moyenne" : "🟢 Basse Priorité"}
      </p>

      {/* ✅ Affichage de la catégorie */}
      <p className="text-sm mt-1">{categoryIcons[task.category]}</p>
    </motion.div>
  );
}
