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
import type { Client } from "@/types/client";
import { FormClient } from "./form-client";
interface ButtonEditClientProps {
  userId: string;
  client: Client;
}
export const ButtonEditClient = ({ userId, client }: ButtonEditClientProps) => {
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
          <DialogTitle>Editar cliente</DialogTitle>
          <DialogDescription>
            Modificá los detalles del cliente
          </DialogDescription>
        </DialogHeader>
        <FormClient userId={userId} toggleModal={toggleModal} client={client} />
      </DialogContent>
    </Dialog>
  );
};
