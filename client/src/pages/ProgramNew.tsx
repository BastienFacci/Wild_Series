import { useNavigate } from "react-router-dom";
import ProgramsForm from "../components/ProgramForm";

function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "",
  };

  return (
    <ProgramsForm
      defaultValue={newProgram}
      onSubmit={(programsData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programsData),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate(`/programs/${data.insertId}`);
          });
      }}
    >
      Ajouter
    </ProgramsForm>
  );
}

export default ProgramNew;
