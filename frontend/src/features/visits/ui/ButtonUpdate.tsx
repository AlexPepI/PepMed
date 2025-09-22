import { Button } from "@mantine/core";
import { useNavigate } from "react-router";
import type { VisitDetail } from "../../../types/visit";

type Props = {
  visit: VisitDetail;
  visitor: { name: string; surname: string; amka?: string };
};

export default function UpdateVisitButton({ visit, visitor }: Props) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() =>
        navigate(`/visit-update/${visit.id}`, {
          state: {
            ...visit,
            name: visitor.name,
            surname: visitor.surname,
            amka: visitor.amka,
          },
        })
      }
    >
      Επεξεργασία Επίσκεψης
    </Button>
  );
}
