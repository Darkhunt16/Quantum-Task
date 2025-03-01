import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/config/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credientals",
      name: "Credientals",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        await connectDB();
        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return {
                id: user._id.toString(),
                fullname: user.fullname,
                email: user.email,
                dob: user.dob,
              };
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "credientals") {
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.fullname = user.fullname; 
        token.email = user.email;
        token.dob = user.dob;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.fullname = token.fullname; 
      session.user.email = token.email;
      session.user.dob = token.dob;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
