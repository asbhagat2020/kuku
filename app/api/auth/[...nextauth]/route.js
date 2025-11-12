// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID?? "",
//       clientSecret: process.env.GOOGLE_SECRET?? "",
//     }),
//     // ...add more providers here
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// }

// export const handler= NextAuth(authOptions)

// export { handler as GET, handler as POST }







// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const clientId = process.env.GOOGLE_CLIENT_ID ?? ""
const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? ""

if (!clientId || !clientSecret) {
  throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET")
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === '/login') return baseUrl
      return url.startsWith('/') ? `${baseUrl}${url}` : baseUrl
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }