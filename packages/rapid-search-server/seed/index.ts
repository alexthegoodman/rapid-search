import clean from "./clean";

import { PrismaClient } from "@prisma/client";
import seedInterests from "./interest";

const prisma = new PrismaClient();

async function main() {
  const { categories, interests } = await seedInterests();
}

clean()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.info("cleaned");
    // reload
    main()
      .catch((e) => console.error(e))
      .finally(async () => {
        console.info("populated");
        await prisma.$disconnect();
      });
  });
