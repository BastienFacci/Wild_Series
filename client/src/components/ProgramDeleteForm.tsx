import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ProgramsDeleteFormProps = {
  id: number;
  children: ReactNode;
};

function ProgramDeleteForm({ id, children }: ProgramsDeleteFormProps) {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`, {
          method: "delete",
        }).then((response) => {
          if (response.status === 204) {
            navigate("/programs");
          }
        });
      }}
    >
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramDeleteForm;
