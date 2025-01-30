import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ✅ Enregistrer les composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Stats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const inProgress = total - completed;

  const data = {
    labels: ["Terminées", "En cours"],
    datasets: [
      {
        label: "Nombre de tâches",
        data: [completed, inProgress],
        backgroundColor: ["#4CAF50", "#FF9800"], // ✅ Couleurs des barres
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded shadow w-full max-w-md">
      <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-2">📊 Statistiques des Tâches</h3>

      {total === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Aucune tâche pour le moment.</p>
      ) : (
        <Bar data={data} />
      )}
    </div>
  );
}
