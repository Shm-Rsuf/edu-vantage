import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./model/user-model";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log({ credentials });
        if (credentials == null) return null;
        try {
          const user = await User.findOne({ email: credentials.email });
          console.log({ user });
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials?.password, //age user e value, tarpore model er value
              user?.password
            );
            if (isMatch) {
              return user;
            } else {
              console.log("Password mismatch hoyeche");
              throw new Error("Check your password");
            }
          } else {
            console.log("User not found!");
            throw new Error("User not found!");
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
});
