import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../libs/mongodb";
import User from "../../../../../models/userSchema/userSchema";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";
import GUser from "../../../../../models/googleUserSchema/googleUserSchema";
import GitUser from "../../../../../models/githubUserSchema/githubUserSchema";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          console.log(user);
          console.log(password);
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_SECRET,
  pages: {
    signin: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          const userExits = await GUser.findOne({ email });
          if (!userExits) {
            const res = await fetch("http://localhost:3000/api/googleUser", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ name, email }),
            });
            if (res.ok) {
              return user;
            }
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      }
      if (account.provider === "github") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          const exitsUser = await GitUser.findOne({ email });
          if (!exitsUser) {
            const res = await fetch("http://localhost:3000/api/githubUser", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ name, email }),
            });
            if (res.ok) {
              return user;
            }
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
