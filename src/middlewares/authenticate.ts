import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace?.("Bearer ", "");
    console.log(req.header("Authorization"));
    if (!token) {
      return res.status(401).json({ message: "Unauthorized 1" });
    }
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId: number = decodedToken.userId;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error("Unauthorized 2");
    req.user = user;
    next();
  } catch (error: any) {
    console.error(error.message);
    return res.status(401).json({ message: "Unauthorized 3" });
  }
};
