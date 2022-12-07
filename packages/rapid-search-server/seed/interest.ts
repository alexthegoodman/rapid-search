import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import slugify from "slugify";
import { SeedInterests } from "./interests";

const prisma = new PrismaClient();

export default async function seedInterests() {
  await prisma.category.createMany({
    data: SeedInterests.map((category, i) => {
      const name = category.title;
      const generatedCategorySlug = slugify(name);

      return {
        name,
        generatedCategorySlug,
      };
    }),
  });

  const createManyInterests = SeedInterests.forEach(async (category, i) => {
    const name = category.title;
    const generatedCategorySlug = slugify(name);

    const items = Array.from(category.items);
    for (const interest of items) {
      const name = interest;
      const generatedInterestSlug = slugify(name);

      const exists = await prisma.interest.findFirst({
        where: { generatedInterestSlug },
      });

      if (exists) return;

      await prisma.interest.create({
        data: {
          name,
          generatedInterestSlug,
          categories: {
            connect: {
              generatedCategorySlug,
            },
          },
        },
      });
    }
    // items.map(async (interest, x) => {

    // });
  });

  const categories = await prisma.category.findMany({
    include: {
      interests: true,
    },
  });

  const interests = await prisma.interest.findMany();

  return {
    categories,
    interests,
  };
}
