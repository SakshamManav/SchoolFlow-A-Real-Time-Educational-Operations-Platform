import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Debug: Check if environment variables are loaded
// console.log('=== Environment Variables Check ===');
// console.log('GOOGLE_ID:', process.env.GOOGLE_ID ? 'Set ✓' : 'Missing ✗');
// console.log('GOOGLE_SECRET:', process.env.GOOGLE_SECRET ? 'Set ✓' : 'Missing ✗');
// console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set ✓' : 'Missing ✗');
// console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
