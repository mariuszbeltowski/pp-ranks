import { UserService } from "./services/user.service";
import { ExpressContext } from "apollo-server-express";

export function getContext(userService: UserService) {
  return ({ req }: ExpressContext) => {
    const token = req.get("Authorization") || "";
    return { user: userService.getUser(token.replace("Bearer ", "")) };
  };
}
