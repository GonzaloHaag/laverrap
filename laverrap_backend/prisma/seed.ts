import { prisma } from "../src/lib/prisma";
import bcrypt from "bcrypt";
async function main() {
  console.log("Seeding database...");
  const user = await prisma.user.create({
    data: {
      username: "Gonzalo",
      email: "test@example.com",
      password: await bcrypt.hash("prueba", 5),
      services: {
        create: {
          name: "Lavado completo",
          description: "Lavado exterior e interior del vehículo",
          price: 50.0,
          duration: 60,
        },
      },
      clients: {
        create: {
          name: "Juan Pérez",
          email: "juan.perez@example.com",
          phone: "3425111071",
          car_model: "Toyota Corolla",
          car_plate: "ABC-1234",
        },
      },
    },
  });
  console.log("Created user with services and clients:", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
