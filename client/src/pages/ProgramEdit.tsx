import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgramsForm from "../components/ProgramForm";

type Program = {
  id: number;
  title: string;
  synopsis?: string;
};

function ProgramEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <ProgramsForm
        defaultValue={program}
        onSubmit={(ProgramsData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/programs/${program?.id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ProgramsData),
          }).then((response) => {
            if (response.status === 204) {
              navigate(`/programs/${program?.id}`);
            }
          });
        }}
      >
        Modifier
      </ProgramsForm>
    )
  );
}

export default ProgramEdit;
