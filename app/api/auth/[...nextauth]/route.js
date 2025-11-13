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







// // app/api/auth/[...nextauth]/route.js
// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"

// const clientId = process.env.GOOGLE_CLIENT_ID ?? ""
// const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? ""

// if (!clientId || !clientSecret) {
//   throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET")
// }

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId,
//       clientSecret,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       if (url === '/login') return baseUrl
//       return url.startsWith('/') ? `${baseUrl}${url}` : baseUrl
//     },
//   },
// }

// const handler = NextAuth(authOptions)
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
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback:", { url, baseUrl });
      
      // Same origin check
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      
      return baseUrl;
    },
    async session({ session, token }) {
      // Optional: Session mein additional data
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  debug: true, // Detailed logs ke liye
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }