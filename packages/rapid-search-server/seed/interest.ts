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
    items.map(async (interest, x) => {
      const name = interest;
      const generatedInterestSlug = slugify(name);

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
    });
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
