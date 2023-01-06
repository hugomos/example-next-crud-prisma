import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../database/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method == "GET") {
    try {
      const { id } = req.query;
      const user = await prisma.user.findFirst({
        where: {
          username: id as string,
        },
      });
      return res.status(201).json({ status: "sucess", data: { user: user } });
    } catch (error) {
      return res
        .status(401)
        .json({ status: "error", data: { message: "failed to get user" } });
    }
  }

  return res
    .status(404)
    .json({ status: "error", data: { message: "route not found" } });
}
