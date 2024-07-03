import db from "./db.js";
import boom from "@hapi/boom";
import bcrypt from "bcryptjs";

export const login = async (username, password) => {
  const user = await db.oneOrNone(
    "SELECT * FROM public.person WHERE name = ${username} and pass = ${password}",
    {
      username,
      password,
    }
  );

  if (!user) throw boom.forbidden("User does not exist");
  let isPasswordCompared = await bcrypt.compare(password, user.pass);

  /**if (!isPasswordCompared) {
    throw boom.forbidden("Password does not match");
  }
*/
  return user;
};
