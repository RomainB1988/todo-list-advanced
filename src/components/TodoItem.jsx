import { motion } from "framer-motion";

export default function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <motion.div
      className="flex flex-col p-2 border-b rounded-lg transition-all duration-300"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
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
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          ❌
        </motion.button>
      </div>

      {task.dueDate && (
        <motion.p
          className="text-sm text-gray-600 dark:text-gray-300 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          📅 {new Date(task.dueDate).toLocaleDateString("fr-FR")} | 🕒 {new Date(task.dueDate).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}
        </motion.p>
      )}
    </motion.div>
  );
}
