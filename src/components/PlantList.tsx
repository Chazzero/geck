import { useEffect, useState } from "react";

const API_URL = "https://trefle.io/api/v1/plants";
const API_KEY = import.meta.env.VITE_API_KEY;

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch(`${API_URL}?token=${API_KEY}`);
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const data = await response.json();
        // Filtrar plantas que tienen el campo 'light' definido
        const filteredPlants = data.data.filter(plant => plant.light);
        setPlants(filteredPlants); // Solo setear las plantas con información sobre la luz
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlants();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (plants.length === 0) return <p>No hay plantas con información sobre la luz.</p>;

  return (
    <div>
      <h2>Lista de Plantas con Información de Luz</h2>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <h3>{plant.name}</h3>
            <p><strong>Nombre común:</strong> {plant.common_name || "Sin nombre común"}</p>
            <p><strong>Luz necesaria:</strong> {plant.light}</p>
            <p><strong>Tipo de suelo:</strong> {plant.soil || "Información no disponible"}</p>
            <p><strong>Riego:</strong> {plant.watering || "Información no disponible"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantList;
