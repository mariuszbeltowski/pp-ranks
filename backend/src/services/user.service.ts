import { hashSync, compare } from "bcrypt";
import { config } from "../config";
import { sign, verify } from "jsonwebtoken";
import { User } from "../models/user";
import { GraphQLError } from "graphql";

export class UserService {
  private adminUser = {
    id: "root-userid",
    password: hashSync("toor", config.bcryptSaltRounds),
    username: "root",
  };

  async login(username: string, password: string) {
    if (username !== this.adminUser.username) {
      throw new GraphQLError("User not found");
    }

    const valid = await compare(password, this.adminUser.password);

    if (!valid) {
      throw new GraphQLError("Password does not match.");
    } else {
      const data: User = {
        id: this.adminUser.id,
        username: this.adminUser.username,
      };
      return sign(data, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    }
  }

  getUser(token?: string): User | null {
    if (token) {
      try {
        return verify(token, config.jwtSecret) as User;
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }
}
