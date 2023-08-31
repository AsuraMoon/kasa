import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Hook personnalisé pour récupérer et gérer les détails d'un appartement
export function useApartment() {
  // État pour stocker les détails de l'appartement récupéré
  const [flat, setFlat] = useState(null);
  const location = useLocation();

  // Effet pour récupérer les détails depuis "db.json" lorsque le composant est monté
  useEffect(() => {
    // Création d'un contrôleur d'annulation pour gérer la mise en ordre lorsque le composant est démonté
    const abortController = new AbortController();

    // Récupération des données depuis "db.json" en utilisant le signal du contrôleur d'annulation
    fetch("db.json", { signal: abortController.signal })
      .then((res) => res.json())
      .then((flats) => {
        // Recherche de l'appartement correspondant à l'ID passé dans l'état de l'emplacement
        const flat = flats.find((flat) => flat.id === location.state.apartmentId);
        setFlat(flat);
      })
      .catch(console.error);
      
    // Fonction de mise en ordre pour annuler la récupération en cours lorsque le composant est démonté
    return () => {
      abortController.abort(); // Annulation de la récupération en cours si le composant est démonté
    };
  }, []); // Le tableau de dépendances vide garantit que cet effet s'exécute uniquement lors du montage du composant

  // Renvoie les détails de l'appartement récupéré
  return flat;
}
