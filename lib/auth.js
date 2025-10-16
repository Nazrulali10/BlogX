import CredentialsProvider from 'next-auth/providers/credentials';
import Users from '@/models/User';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongoose';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectDB();
        const user = await Users.findOne({ email: credentials.email });

        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error('Wrong password');

        return {
          id: user._id.toString(),
          _id: user._id.toString(),
          email: user.email,
          username: user.username,
          badgecolor: user.badgecolor,
          name: user.name,
          followers: user.followers,
          following: user.following,
          profilepic: user.profilepic,
          blogs: user.blogs,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token._id = user._id;
        token.username = user.username;
        token.badgecolor = user.badgecolor;
        token.name = user.name;
        token.email = user.email;
        token.followers = user.followers;
        token.following = user.following;
        token.profilepic = user.profilepic;
        token.blogs = user.blogs;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user._id = token._id;
      session.user.username = token.username;
      session.user.badgecolor = token.badgecolor;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.followers = token.followers;
      session.user.following = token.following;
      session.user.profilepic = token.profilepic;
      session.user.blogs = token.blogs;
      return session;
    },
  },
  pages: {
    signIn: '/LoginPage',
  },
};
