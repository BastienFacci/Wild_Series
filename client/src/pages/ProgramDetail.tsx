import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProgramsDeleteForm from "../components/ProgramDeleteForm";

type Programs = {
  id: number;
  title: string;
};

function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Programs);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Programs) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <>
        <h1>{program.title}</h1>
        <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
        <ProgramsDeleteForm id={program.id}>Supprimer</ProgramsDeleteForm>
      </>
    )
  );
}

export default ProgramDetail;
