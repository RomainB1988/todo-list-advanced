import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, toggleTask, deleteTask }) {
  return (
    <motion.div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Aucune tâche pour le moment.</p>
      ) : (
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <TodoItem task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
