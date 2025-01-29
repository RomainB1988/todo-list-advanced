import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "./context/DarkModeContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Stats from "./components/Stats";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapView from "./components/MapView"; // ✅ Importer la carte

export default function App() {
  const { darkMode, setDarkMode } = useDarkMode();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  // ✅ Gestion du thème personnalisé
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem("themeColor") || "#4CAF50"; // ✅ Par défaut vert
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  // ✅ Demande l'autorisation des notifications bureau
  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, []);

  // ✅ Fonction pour envoyer une notification bureau
  const sendNotification = (title, message) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        icon: "/favicon.ico",
      });
    }
  };

  // ✅ Vérifie toutes les heures si des tâches sont urgentes ou en retard
  useEffect(() => {
    const checkUrgentTasks = () => {
      tasks.forEach((task) => {
        if (!task.dueDate || task.completed) return;

        const now = new Date();
        const dueDate = new Date(task.dueDate);
        const timeDiff = dueDate - now;
        const hoursLeft = timeDiff / (1000 * 60 * 60);

        if (hoursLeft < 24 && hoursLeft > 0) {
          toast.warn(`⚠️ Rappel : "${task.text}" doit être terminée sous 24h !`);
          sendNotification("⚠️ Tâche urgente", `La tâche "${task.text}" doit être terminée sous 24h.`);
        }
        if (hoursLeft < 0) {
          toast.error(`⏳ Attention : "${task.text}" est en retard !`);
          sendNotification("⏳ Tâche en retard", `La tâche "${task.text}" est en retard.`);
        }
      });
    };

    const interval = setInterval(checkUrgentTasks, 3600000); // ✅ Vérifie toutes les heures
    checkUrgentTasks(); // ✅ Vérifie immédiatement au chargement

    return () => clearInterval(interval);
  }, [tasks]);

  // ✅ Fonction pour ajouter une tâche avec date + heure + catégorie + priorité + localisation
  const addTask = (text, dueDate, priority, category, location) => {
    if (!text.trim()) return;
    const newTasks = [...tasks, { id: Date.now(), text, completed: false, dueDate, priority, category, location }];
    setTasks(newTasks);
    toast.success("✅ Tâche ajoutée avec succès !");
  };

  // ✅ Fonction pour importer un fichier JSON de tâches
  const importTasks = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
        if (Array.isArray(importedTasks)) {
          setTasks(importedTasks);
          localStorage.setItem("tasks", JSON.stringify(importedTasks));
          toast.success("✅ Tâches importées avec succès !");
        } else {
          toast.error("⚠️ Fichier invalide !");
        }
      } catch (error) {
        toast.error("❌ Erreur lors de l'importation !");
      }
    };
    reader.readAsText(file);
  };

  // ✅ Fonction pour exporter les tâches en JSON
  const exportTasks = () => {
    const jsonData = JSON.stringify(tasks, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "todo-list.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("📂 Tâches exportées avec succès !");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center p-6 transition-all duration-300"
      style={{ backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF", color: themeColor }}
    >
      {/* ✅ Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />

      {/* ✅ Sélecteur de thème personnalisé */}
      <div className="flex items-center justify-center py-4">
        <label className="mr-2 text-gray-900 dark:text-white">🎨 Couleur du thème :</label>
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
          className="w-10 h-10 border-none cursor-pointer"
        />
      </div>

      {/* ✅ Bouton Mode Sombre */}
      <motion.button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 px-4 py-2 rounded"
        style={{ backgroundColor: themeColor, color: "#FFFFFF" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? "☀️ Mode Clair" : "🌙 Mode Sombre"}
      </motion.button>

      <h1 className="text-3xl font-bold mb-4">📋 To-Do List</h1>

      {/* ✅ Import / Export JSON */}
      <div className="flex gap-2 my-4">
        <button onClick={exportTasks} className="px-4 py-2 bg-green-500 text-white rounded">
          📥 Exporter
        </button>
        <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
          📂 Importer
          <input type="file" accept="application/json" onChange={importTasks} className="hidden" />
        </label>
      </div>

      {/* ✅ Formulaire d'ajout */}
      <TodoForm addTask={addTask} />

      <Stats tasks={tasks} />

      <TodoList tasks={tasks} toggleTask={(id) => setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))} deleteTask={(id) => setTasks(tasks.filter((task) => task.id !== id))} />

      {/* ✅ Carte des tâches avec localisation */}
      <motion.div className="min-h-screen flex flex-col items-center p-6">

      {/* ✅ Formulaire + Stats + Liste des Tâches */}
      <TodoForm addTask={addTask} />
      <Stats tasks={tasks} />
      <TodoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />

      {/* ✅ Ajouter la carte */}
      <MapView tasks={tasks} />
      </motion.div>

    </motion.div>
  );
}
