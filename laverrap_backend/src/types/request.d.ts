import type { UserType } from "../schemas/user.schema";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
