import type { ReactNode } from "react";

type ProgramsData = {
  title: string;
};

interface ProgramsFormProps {
  children: ReactNode;
  defaultValue: ProgramsData;
  onSubmit: (programs: ProgramsData) => void;
}

function ProgramForm({ children, defaultValue, onSubmit }: ProgramsFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get("title") as string;

        onSubmit({
          title,
        });
      }}
    >
      <input type="text" name="title" defaultValue={defaultValue.title} />
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramForm;
