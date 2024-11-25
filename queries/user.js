import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email }).lean();
  return replaceMongoIdInObject(user);
};

export const validatePassword = async (email, password) => {
  const user = await getUserByEmail(email);
  const isMatch = await bcrypt.compare( password, user.password );
  console.log({ isMatch });
  return isMatch;
};
