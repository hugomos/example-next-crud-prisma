import { prisma } from "../database/prisma";

export async function getUsers() {
  const users = prisma.user.findMany();
  return users;
}
