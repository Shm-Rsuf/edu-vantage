import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email }).lean();
  return replaceMongoIdInObject(user);
};
