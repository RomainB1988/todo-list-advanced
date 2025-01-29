import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Fix des icônes Leaflet (car elles ne s'affichent pas par défaut avec React)
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapView({ tasks }) {
  // Filtrer uniquement les tâches avec une localisation
  const tasksWithLocation = tasks.filter(task => task.location);

  return (
    <div className="w-full h-96 mt-6">
      <h2 className="text-xl font-bold mb-4">📍 Tâches sur la Carte</h2>
      <MapContainer center={[48.8566, 2.3522]} zoom={5} className="w-full h-full rounded-lg shadow">
        {/* ✅ Ajouter le fond OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* ✅ Afficher toutes les tâches avec localisation */}
        {tasksWithLocation.map((task, index) => (
          <Marker key={index} position={task.location} icon={customIcon}>
            <Popup>
              <strong>{task.text}</strong> <br />
              📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString("fr-FR") : "Pas de date"} <br />
              🔴 Priorité : {task.priority} <br />
              📍 Lieu : {task.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
