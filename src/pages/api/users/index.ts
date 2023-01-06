import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../database/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method == "GET") {
    try {
      const users = await prisma.user.findMany();
      return res.status(201).json({ status: "sucess", data: { users: users } });
    } catch (error) {
      return res
        .status(401)
        .json({ status: "error", data: { message: error } });
    }
  } else if (method == "POST") {
    try {
      const { name, username } = req.body;
      const user = await prisma.user.create({
        data: {
          name,
          username,
        },
      });
      await res.revalidate("/");
      return res.status(201).json({ status: "sucess", data: { user: user } });
    } catch (error) {
      return res
        .status(401)
        .json({ status: "error", data: { message: "create user failed" } });
    }
  }

  return res
    .status(404)
    .json({ status: "error", data: { message: "route not found" } });
}
