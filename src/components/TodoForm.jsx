import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function TodoForm({ addTask }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("other");
  const [location, setLocation] = useState(""); // ✅ Ajout du champ localisation

  // ✅ Convertir une adresse en coordonnées GPS
  const convertAddressToCoords = async (address) => {
    if (!address) return null;
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();

    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
      toast.error("❌ Adresse introuvable !");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    let fullDueDate = dueDate;
    if (dueDate && dueTime) {
      fullDueDate = `${dueDate}T${dueTime}`;
    }

    // ✅ Convertir l'adresse en coordonnées GPS
    const coords = await convertAddressToCoords(location);

    addTask(task, fullDueDate, priority, category, coords);
    setTask("");
    setDueDate("");
    setDueTime("");
    setPriority("medium");
    setCategory("other");
    setLocation("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col space-y-2 w-full max-w-md"
    >
      <motion.input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="Ajouter une tâche..."
      />

      <motion.input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
      <motion.input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />

      <motion.select value={priority} onChange={(e) => setPriority(e.target.value)} className="border rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
        <option value="high">🔴 Haute Priorité</option>
        <option value="medium">🟠 Priorité Moyenne</option>
        <option value="low">🟢 Basse Priorité</option>
      </motion.select>

      <motion.select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
        <option value="work">✅ Travail</option>
        <option value="home">🏠 Maison</option>
        <option value="studies">🎓 Études</option>
        <option value="shopping">🛒 Courses</option>
        <option value="other">🎯 Autres</option>
      </motion.select>

      {/* ✅ Champ de localisation */}
      <motion.input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border rounded px-4 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="Ajouter un lieu (ex: Paris, supermarché...)"
      />

      <motion.button type="submit" className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded">
        Ajouter
      </motion.button>
    </motion.form>
  );
}
