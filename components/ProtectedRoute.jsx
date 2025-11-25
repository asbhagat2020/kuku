
// "use client";

// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useRouter, usePathname } from "next/navigation";
// import toast from "react-hot-toast";

// export default function ProtectedRoute({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     if (isAuthenticated && user && user.isProfileComplete === false) {
//       if (pathname !== "/account" && !pathname.includes("/login")) {
//         toast.error("Please complete your profile first!");
//         router.replace("/account");
//       }
//     }
//   }, [isAuthenticated, user, pathname, router]);

//   if (isAuthenticated && user && user.isProfileComplete === false) {
//     return null;
//   }

//   return <>{children}</>;
// }





"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isAuthenticated && user && user.isProfileComplete === false) {
      if (pathname !== "/account" && !pathname.includes("/login")) {
        toast.error("Please complete your profile first!");
        router.replace("/account");
      }
    }
  }, [isAuthenticated, user, pathname, router]);


  return <>{children}</>;
}