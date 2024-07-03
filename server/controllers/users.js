import Boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import db from "./db.js";

export const createUser = async ({ name, password }) => {
  let user;
  console.log("creating user with", name, password);
  try {
    let passhash = await bcrypt.hash(password, 10);

    user = await db.one(
      "INSERT INTO public.person (name, pass) VALUES (${name}, ${passhash}) RETURNING *;",
      {
        passhash,
        name,
      }
    );
  } catch (e) {
    if (e.message.includes("unique_email_cstr")) {
      throw Boom.badData(`User already exists`);
    }
    throw e;
  }

  return user;
};
