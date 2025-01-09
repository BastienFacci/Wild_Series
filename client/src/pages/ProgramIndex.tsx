import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface programsProps {
  id: number;
  title: string;
}

const ProgramIndex = () => {
  const [programs, setPrograms] = useState<programsProps[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: programsProps[]) => setPrograms(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error),
      );
  }, []);

  if (programs.length === 0) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Link to={"/programs/new"}>Ajouter</Link>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <Link to={`/programs/${program.id}`}>{program.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProgramIndex;
