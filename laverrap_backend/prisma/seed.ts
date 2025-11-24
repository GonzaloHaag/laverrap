import { prisma } from "../src/utils/db";
import bcrypt from "bcrypt";
import config from "../src/utils/config";
async function main() {
  const userGonzalo = await prisma.user.upsert({
    where: { email: "gonza13@gmail.com" },
    update: {},
    create: {
      email: "gonza13@gmail.com",
      username: "Gonzalo",
      password: await bcrypt.hash("prueba12345", config.SALT_ROUNDS),
      // Creacion de servicios
      services: {
        create: {
          name: "Lavado basico",
          duration: 60,
          price: 500,
          description: "Lavado exterior e interior basico",
        },
      },
    },
  });

  const userTest = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      username: "userTest",
      password: await bcrypt.hash("prueba", config.SALT_ROUNDS),
      services: {
        create: {
          name: "Servicio de prueba",
          duration: 30,
          price: 200,
          description: "Este es un servicio de prueba",
          category: "COMPLETE",
        },
      },
    },
  });

  console.log({ userGonzalo, userTest });
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
