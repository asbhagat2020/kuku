
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
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         }
//       }
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/login',
//     error: '/login',
//   },
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       console.log("🔄 Redirect callback:", { url, baseUrl });
      
//       // Agar URL "/login" hai, to directly "/" pe redirect karo
//       if (url === `${baseUrl}/login` || url === '/login') {
//         console.log("✅ Redirecting to homepage");
//         return baseUrl; // Homepage
//       }
      
//       // Agar URL relative hai (/ se start)
//       if (url.startsWith('/')) return `${baseUrl}${url}`;
      
//       // Agar URL same origin hai
//       if (new URL(url).origin === baseUrl) return url;
      
//       // Default: baseUrl (homepage)
//       return baseUrl;
//     },
//     async session({ session, token }) {
//       if (session?.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//   },
//   debug: true,
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }








// ✅ FIXED: app/api/auth/[...nextauth]/route.js

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
      console.log("🔄 NextAuth redirect callback:", { url, baseUrl });
      
      // ✅ Let the originating page handle the session
      // Don't force redirect here - just return to the page that initiated auth
      if (url.includes('/api/auth/callback/google')) {
        // Check if there's a callbackUrl in the original request
        const urlParams = new URL(url, baseUrl).searchParams;
        const callbackUrl = urlParams.get('callbackUrl');
        
        if (callbackUrl) {
          console.log("✅ Using callbackUrl:", callbackUrl);
          return callbackUrl;
        }
        
        // Default: return to login page
        // The page's useEffect will handle googleAuth dispatch
        console.log("✅ No callbackUrl - returning to /login");
        return `${baseUrl}/login`;
      }
      
      // For other redirects
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      
      return `${baseUrl}/login`;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  debug: true,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }