import { AnimatePresence, motion } from "framer-motion";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, toggleTask, deleteTask }) {
  return (
    <motion.div
      className="w-full max-w-md mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📝 Liste des Tâches</h2>

      <AnimatePresence>
        {tasks.length === 0 ? (
          <motion.p className="text-gray-500 dark:text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Aucune tâche pour le moment.
          </motion.p>
        ) : (
          tasks.map((task) => (
            <TodoItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
}
