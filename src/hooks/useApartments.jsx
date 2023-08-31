import { useState, useEffect } from "react";

// Hook personnalisé pour récupérer et gérer les données des appartements
export const useApartments = () => {
  // État pour stocker les données des appartements récupérées
  const [apartments, setApartments] = useState([]);

  // Hook d'effet pour récupérer les données depuis "db.json" lorsque le composant est monté
  useEffect(() => {
    // Création d'un contrôleur d'annulation pour gérer la mise en ordre lorsque le composant est démonté
    const abortController = new AbortController();

    // Récupération des données depuis "db.json" en utilisant le signal du contrôleur d'annulation
    fetch("db.json", { signal: abortController.signal })
      .then((res) => res.json())
      .then((res) => setApartments(res))
      .catch(console.error);

    // Fonction de mise en ordre pour annuler la récupération en cours lorsque le composant est démonté
    return () => {
      //console.log("nettoyage");
      abortController.abort(); // Annulation de la récupération en cours si le composant est démonté
    };
  }, []); // Le tableau de dépendances vide garantit que cet effet s'exécute uniquement lors du montage du composant

  // Renvoie les données des appartements récupérées
  return apartments;
};
