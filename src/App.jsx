import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "./context/DarkModeContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Stats from "./components/Stats";
import MapView from "./components/MapView";
import CalendarView from "./components/CalendarView";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { darkMode, setDarkMode } = useDarkMode();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem("themeColor") || "#4CAF50";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  const addTask = (text, dueDate, priority, category, location) => {
    if (!text.trim()) return;
    const validLocation = Array.isArray(location) && location.length === 2 ? location : null;
    const newTasks = [...tasks, { id: Date.now(), text, completed: false, dueDate, priority, category, location: validLocation }];
    setTasks(newTasks);
    toast.success("✅ Tâche ajoutée avec succès !");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center p-6 transition-all duration-300"
      style={{ backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF", color: themeColor }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />

      <motion.h1 className="text-3xl font-bold mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        📋 To-Do List
      </motion.h1>

      {/* ✅ Conteneur Principal avec 3 Colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">

        {/* ✅ Colonne Gauche (Calendrier & Stats) */}
        <div className="flex flex-col gap-4">
          <CalendarView tasks={tasks} />
          <Stats tasks={tasks} />
        </div>

        {/* ✅ Colonne Centrale (Formulaire & Liste des Tâches) */}
        <div className="flex flex-col gap-4">
          <TodoForm addTask={addTask} />
          <TodoList tasks={tasks} toggleTask={(id) => setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))} deleteTask={(id) => setTasks(tasks.filter((task) => task.id !== id))} />
        </div>

        {/* ✅ Colonne Droite (Carte Interactive) */}
        <div className="flex flex-col gap-4">
          <MapView tasks={tasks} />
        </div>

      </div>

    </motion.div>
  );
}
