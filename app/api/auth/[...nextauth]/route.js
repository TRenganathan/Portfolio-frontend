import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "./../../../../model/User";
import { connectMongoDB } from "./../../../../lib/mongoDB";
const handler = NextAuth({
  providers: [
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
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectMongoDB();
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create a new user if one doesn't exist
          const newUser = new User({
            email: user.email,
            name: user.name,
            provider: "google", // Identify the provider
            blogs: [],
          });
          existingUser = await newUser.save();
        }

        user.userId = existingUser._id.toString();
        user.provider = existingUser.provider;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.userId = user?.userId;
        token.email = user?.email;
        token.name = user?.name;
        token.provider = user?.provider;
      }
      console.log(user, "USER");
      return token;
    },
    async session({ session, token }) {
      session.user.userId = token.userId;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.provider = token?.provider;

      return session;
    },
  },
});
export { handler as GET, handler as POST };
