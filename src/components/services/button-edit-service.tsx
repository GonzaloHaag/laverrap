import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { Service } from "@/types/service";
import { FormService } from "./form-service";
interface ButtonEditServiceProps {
  userId: string;
  service: Service;
}
export const ButtonEditService = ({
  userId,
  service,
}: ButtonEditServiceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prevState) => !prevState);
  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <Button type="button" variant={"link"} title="Editar" className="p-0">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo servicio</DialogTitle>
          <DialogDescription>
            Colocá los detalles que ofrecera el servicio.
          </DialogDescription>
        </DialogHeader>
        <FormService
          userId={userId}
          toggleModal={toggleModal}
          service={service}
        />
      </DialogContent>
    </Dialog>
  );
};
