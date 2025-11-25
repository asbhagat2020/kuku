// "use client";

// import { toast } from "react-hot-toast";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";

// // Helper function to safely parse cookie
// const safeParseCookie = (cookieValue) => {
//   if (!cookieValue || cookieValue === "undefined" || cookieValue === "null") {
//     return null;
//   }
//   try {
//     return JSON.parse(cookieValue);
//   } catch (error) {
//     console.error("Error parsing cookie:", error);
//     return null;
//   }
// };

// // Safely parse user cookie
// const user =
//   typeof window !== "undefined"
//     ? (() => {
//         const userCookie = Cookies.get("user");
//         const parsedUser = safeParseCookie(userCookie);
//         return parsedUser || { _id: "", username: "", name: "" };
//       })()
//     : { _id: "", username: "", name: "" };

// // Safely parse auth cookie
// const token =
//   typeof window !== "undefined"
//     ? (() => {
//         const authCookie = Cookies.get("auth");
//         return safeParseCookie(authCookie);
//       })()
//     : null;

// const initialState = {
//   user: user,
//   token: token,
//   isAuthenticated: !!token,
//   loading: false,
//   error: null,
//   otpSend: false,
//   signupSuccess: false,
// };

// // Register OTP
// export const registerOtp = createAsyncThunk(
//   "auth/sendRegistrationOtp",
//   async ({ emailOrPhone }, { rejectWithValue }) => {
//     try {
//       if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
//         console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
//         toast.error("Server configuration error. Please contact support.");
//         return rejectWithValue("Server configuration error");
//       }

//       console.log("Sending registration OTP request:", { emailOrPhone });

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/otp`,
//         { emailOrPhone }
//       );

//       toast.success(response?.data?.message || "OTP sent successfully");
//       return response.data;
//     } catch (error) {
//       console.error("registerOtp error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       const errorMessage =
//         error.response?.data?.message || "Failed to send OTP";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const googleSignUp = createAsyncThunk(
//   "auth/googleSignUp",
//   async ({ session, status }, { rejectWithValue }) => {
//     try {
//       if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
//         console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
//         toast.error("Server configuration error. Please contact support.");
//         return rejectWithValue("Server configuration error");
//       }
//       console.log("Google Sign-Up request for:", session.user.email);
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/social`,
//         {
//           email: session.user.email,
//           name: session.user.name,
//         }
//       );
//       toast.success("Sign up successful");
//       return response.data;
//     } catch (error) {
//       console.error("googleSignUp error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       const errorMessage =
//         error.response?.data?.message || "Google signup failed";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const googleSignIn = createAsyncThunk(
//   "auth/googleSignIn",
//   async ({ session }, { rejectWithValue }) => {
//     try {
//       if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
//         console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
//         toast.error("Server configuration error. Please contact support.");
//         return rejectWithValue("Server configuration error");
//       }
//       console.log("Google Sign-In request for:", session?.user?.email);
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/social`,
//         {
//           email: session?.user?.email,
//         }
//       );
//       Cookies.set("auth", JSON.stringify(response.data.token));
//       Cookies.set("user", JSON.stringify(response.data.user));
//       toast.success("Sign in successful");
//       return response.data;
//     } catch (error) {
//       console.error("googleSignIn error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       const errorMessage =
//         error.response?.data?.message || "Google signin failed";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// // New unified Google auth thunk
// export const googleAuth = createAsyncThunk(
//   "auth/googleAuth",
//   async ({ session }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/google`,
//         {
//           email: session.user.email,
//           name: session.user.name || session.user.email.split("@")[0],
//         }
//       );

//       Cookies.set("auth", JSON.stringify(response.data.token));
//       Cookies.set("user", JSON.stringify(response.data.user));

//       return {
//         ...response.data,
//         redirectTo: response.data.redirectTo || "/",
//       };
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Google login failed";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const signinOtp = createAsyncThunk(
//   "auth/sendSigninOtp",
//   async ({ emailOrPhone }, { rejectWithValue }) => {
//     try {
//       if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
//         console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
//         toast.error("Server configuration error. Please contact support.");
//         return rejectWithValue("Server configuration error");
//       }

//       console.log("Sending OTP request:", { emailOrPhone });

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/otp`,
//         { emailOrPhone }
//       );

//       toast.success(response?.data?.message || "OTP sent successfully");
//       return response.data;
//     } catch (error) {
//       console.error("signinOtp error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       const errorMessage =
//         error.response?.data?.message || "Failed to send OTP";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const verifySigninOtp = createAsyncThunk(
//   "auth/otpSignIn",
//   async ({ emailOrPhone, otp }, { rejectWithValue }) => {
//     try {
//       if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
//         console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
//         toast.error("Server configuration error. Please contact support.");
//         return rejectWithValue("Server configuration error");
//       }

//       console.log("Verifying OTP for:", { emailOrPhone, otp });

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/login/verify`,
//         { emailOrPhone, otp: +otp }
//       );

//       Cookies.set("auth", JSON.stringify(response.data.token));
//       Cookies.set("user", JSON.stringify(response.data.user));
//       toast.success("Login successful");
//       return response.data;
//     } catch (error) {
//       console.error("verifySigninOtp error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       const errorMessage = error.response?.data?.message || "Invalid OTP";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const otpSignup = createAsyncThunk(
//   "auth/otpSignup",
//   async ({ emailOrPhone, otp }, { rejectWithValue }) => {
//     try {
//       if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
//         console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
//         toast.error("Server configuration error. Please contact support.");
//         return rejectWithValue("Server configuration error");
//       }

//       console.log("Verifying signup OTP for:", emailOrPhone);

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/register/verify`,
//         { emailOrPhone, otp: +otp }
//       );

//       Cookies.set("auth", JSON.stringify(response.data.token));
//       Cookies.set("user", JSON.stringify(response.data.user));
//       toast.success(response.data.message || "Registration successful");
//       return response.data;
//     } catch (error) {
//       console.error("otpSignup error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       const errorMessage =
//         error.response?.data?.message || "OTP verification failed";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const facebookSignIn = createAsyncThunk(
//   "auth/facebookSignIn",
//   async (_, { rejectWithValue }) => {
//     try {
//       throw new Error("Facebook Sign-In not implemented");
//     } catch (error) {
//       console.error("facebookSignIn error:", error);
//       toast.error("Facebook Sign-In not implemented");
//       return rejectWithValue("Facebook Sign-In not implemented");
//     }
//   }
// );

// export const updateDetails = createAsyncThunk(
//   "auth/updateDetails",
//   async (
//     { KukuUsername, fullName, Description, phone, location, isChecked, id, isProfileComplete },
//     { rejectWithValue }
//   ) => {
//     try {
//       if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
//         console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
//         toast.error("Server configuration error. Please contact support.");
//         return rejectWithValue("Server configuration error");
//       }
//       console.log("Updating details for user ID:", id);
//       const response = await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/update/details/${id}`,
//         {
//           username: KukuUsername,
//           name: fullName,
//           phone: phone,
//           description: Description,
//           location: location,
//           anonymous: !isChecked,
//         }
//       );
//       Cookies.set("auth", JSON.stringify(response.data.token));
//       const updatedUser = {
//         ...response.data.user,
//         isProfileComplete: isProfileComplete ?? true,
//       };
//       Cookies.set("user", JSON.stringify(updatedUser));
//       // toast.success(response.data.message || "Details updated successfully");
//       return updatedUser;
//     } catch (error) {
//       console.error("updateDetails error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       const errorMessage = error.response?.data?.message || "Update failed";
//       const errorField = error.response?.data?.field;
//       toast.error(errorMessage);
//       return rejectWithValue({
//         message: errorMessage,
//         field: errorField,
//       });
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.otpSend = false;
//       state.signupSuccess = false;
//       Cookies.remove("auth");
//       Cookies.remove("user");
//     },
//     clearOtp: (state) => {
//       state.otpSend = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.otpSend = false;
//       })
//       .addCase(registerOtp.fulfilled, (state, action) => {
//         state.loading = false;
//         state.otpSend = true;
//       })
//       .addCase(registerOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//     builder
//       .addCase(otpSignup.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.signupSuccess = false;
//       })
//       .addCase(otpSignup.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.loading = false;
//         state.error = null;
//         state.signupSuccess = true;
//         state.isAuthenticated = true;
//       })
//       .addCase(otpSignup.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//         state.signupSuccess = false;
//       });
//     builder
//       .addCase(googleSignUp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(googleSignUp.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(googleSignUp.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       });
//     builder
//       .addCase(googleSignIn.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(googleSignIn.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(googleSignIn.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       });
//     builder
//       .addCase(verifySigninOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifySigninOtp.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(verifySigninOtp.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       });
//     builder
//       .addCase(facebookSignIn.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(facebookSignIn.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(facebookSignIn.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       });
//     builder
//       .addCase(updateDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateDetails.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(updateDetails.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       });

//     builder
//     .addCase(googleAuth.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(googleAuth.fulfilled, (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       state.loading = false;
//       state.error = null;
//     })
//     .addCase(googleAuth.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.isAuthenticated = false;
//     });
//   },
// });

// export const { logout, clearOtp } = authSlice.actions;
// export default authSlice.reducer;

"use client";
import { toast } from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
// Helper function to safely parse cookie
const safeParseCookie = (cookieValue) => {
  if (!cookieValue || cookieValue === "undefined" || cookieValue === "null") {
    return null;
  }
  try {
    return JSON.parse(cookieValue);
  } catch (error) {
    console.error("Error parsing cookie:", error);
    return null;
  }
};
// Safely parse user cookie
const user =
  typeof window !== "undefined"
    ? (() => {
        const userCookie = Cookies.get("user");
        const parsedUser = safeParseCookie(userCookie);
        return parsedUser || { _id: "", username: "", name: "" };
      })()
    : { _id: "", username: "", name: "" };
// Safely parse auth cookie
const token =
  typeof window !== "undefined"
    ? (() => {
        const authCookie = Cookies.get("auth");
        return safeParseCookie(authCookie);
      })()
    : null;
const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
  otpSend: false,
  signupSuccess: false,
};
// Register OTP
export const registerOtp = createAsyncThunk(
  "auth/sendRegistrationOtp",
  async ({ emailOrPhone }, { rejectWithValue }) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
        toast.error("Server configuration error. Please contact support.");
        return rejectWithValue("Server configuration error");
      }
      console.log("Sending registration OTP request:", { emailOrPhone });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/otp`,
        { emailOrPhone }
      );
      toast.success(response?.data?.message || "OTP sent successfully");
      return response.data;
    } catch (error) {
      console.error("registerOtp error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage =
        error.response?.data?.message || "Failed to send OTP";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
// Google Login Auth (for /login page)
export const googleLoginAuth = createAsyncThunk(
  "auth/googleLoginAuth",
  async ({ session }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/google`,
        {
          email: session.user.email,
          name: session.user.name || session.user.email.split("@")[0],
        }
      );
      Cookies.set("auth", JSON.stringify(response.data.token));
      Cookies.set("user", JSON.stringify(response.data.user));
      return {
        ...response.data,
        redirectTo: response.data.redirectTo || "/",
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Google login failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
// Google Register Auth (for /registration page)
export const googleRegisterAuth = createAsyncThunk(
  "auth/googleRegisterAuth",
  async ({ session }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/google`,
        {
          email: session.user.email,
          name: session.user.name || session.user.email.split("@")[0],
        }
      );
      Cookies.set("auth", JSON.stringify(response.data.token));
      Cookies.set("user", JSON.stringify(response.data.user));
      return {
        ...response.data,
        redirectTo: response.data.redirectTo || "/account",
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Google registration failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
export const signinOtp = createAsyncThunk(
  "auth/sendSigninOtp",
  async ({ emailOrPhone }, { rejectWithValue }) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
        toast.error("Server configuration error. Please contact support.");
        return rejectWithValue("Server configuration error");
      }
      console.log("Sending OTP request:", { emailOrPhone });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/otp`,
        { emailOrPhone }
      );
      toast.success(response?.data?.message || "OTP sent successfully");
      return response.data;
    } catch (error) {
      console.error("signinOtp error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage =
        error.response?.data?.message || "Failed to send OTP";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
export const verifySigninOtp = createAsyncThunk(
  "auth/otpSignIn",
  async ({ emailOrPhone, otp }, { rejectWithValue }) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
        toast.error("Server configuration error. Please contact support.");
        return rejectWithValue("Server configuration error");
      }
      console.log("Verifying OTP for:", { emailOrPhone, otp });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/login/verify`,
        { emailOrPhone, otp: +otp }
      );
      Cookies.set("auth", JSON.stringify(response.data.token));
      Cookies.set("user", JSON.stringify(response.data.user));
      toast.success("Login successful");
      return response.data;
    } catch (error) {
      console.error("verifySigninOtp error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage = error.response?.data?.message || "Invalid OTP";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
// export const otpSignup = createAsyncThunk(
//   "auth/otpSignup",
//   async ({ emailOrPhone, otp }, { rejectWithValue }) => {
//     try {
//       if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
//         console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
//         toast.error("Server configuration error. Please contact support.");
//         return rejectWithValue("Server configuration error");
//       }
//       console.log("Verifying signup OTP for:", emailOrPhone);
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/register/verify`,
//         { emailOrPhone, otp: +otp }
//       );
//       Cookies.set("auth", JSON.stringify(response.data.token));
//       Cookies.set("user", JSON.stringify(response.data.user));
//       toast.success(response.data.message || "Registration successful");
//       return response.data;
//     } catch (error) {
//       console.error("otpSignup error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       const errorMessage =
//         error.response?.data?.message || "OTP verification failed";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

export const otpSignup = createAsyncThunk(
  "auth/otpSignup",
  async ({ emailOrPhone, otp }, { rejectWithValue }) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
        toast.error("Server configuration error. Please contact support.");
        return rejectWithValue("Server configuration error");
      }
      console.log("Verifying signup OTP for:", emailOrPhone);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/register/verify`,
        { emailOrPhone, otp: +otp }
      );
      
      // ✅ FIXED: Safe token set (if exists)
      if (response.data.token) {
        Cookies.set("auth", JSON.stringify(response.data.token));
      } else {
        console.warn("No token in signup response – session may not persist");
      }
      Cookies.set("user", JSON.stringify(response.data.user));
      toast.success(response.data.message || "Registration successful");
      return response.data;
    } catch (error) {
      console.error("otpSignup error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage =
        error.response?.data?.message || "OTP verification failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


export const facebookSignIn = createAsyncThunk(
  "auth/facebookSignIn",
  async (_, { rejectWithValue }) => {
    try {
      throw new Error("Facebook Sign-In not implemented");
    } catch (error) {
      console.error("facebookSignIn error:", error);
      toast.error("Facebook Sign-In not implemented");
      return rejectWithValue("Facebook Sign-In not implemented");
    }
  }
);

export const updateDetails = createAsyncThunk(
  "auth/updateDetails",
  async (
    {
      KukuUsername,
      fullName,
      Description,
      phone,
      location,
      isChecked,
      id,
      isProfileComplete,
    },
    { rejectWithValue }
  ) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
        toast.error("Server configuration error. Please contact support.");
        return rejectWithValue("Server configuration error");
      }

      // ✅ FIXED: Extract token from cookies with parse (matches otpSignup pattern)
      const authCookie = Cookies.get("auth");
      if (!authCookie) {
        throw new Error("No auth token found in cookies");
      }
      let token;
      try {
        const parsedAuth = JSON.parse(authCookie);
        token = parsedAuth.token || parsedAuth; // Handle if direct string or object
      } catch (parseError) {
        console.error("Auth cookie parse error:", parseError);
        throw new Error("Invalid auth cookie format");
      }
      if (!token) {
        throw new Error("No token in auth cookie");
      }

      console.log(
        "Updating details for user ID:",
        id,
        "Token exists:",
        !!token
      );
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/update/details/${id}`,
        {
          username: KukuUsername,
          name: fullName,
          phone: phone,
          description: Description,
          location: location,
          anonymous: !isChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Uses parsed token
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Match otpSignup: Set with stringify (assume response.data.token is string)
      Cookies.set("auth", JSON.stringify(response.data.token));

      // Use backend's value directly
      const updatedUser = response.data.user;
      Cookies.set("user", JSON.stringify(updatedUser));

      // toast.success(response.data.message || "Details updated successfully");
      return updatedUser;
    } catch (error) {
      // Better logging
      if (error.response) {
        console.error("updateDetails Axios error:", {
          message: error.message,
          status: error.response.status,
          data: error.response.data,
        });
      } else if (error.request) {
        console.error("updateDetails Network error:", error.message);
      } else {
        console.error("updateDetails Custom error:", error.message);
      }

      const errorMessage =
        error.response?.data?.message || error.message || "Update failed";
      const errorField = error.response?.data?.field;
      toast.error(errorMessage);
      return rejectWithValue({
        message: errorMessage,
        field: errorField,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.otpSend = false;
      state.signupSuccess = false;
      Cookies.remove("auth");
      Cookies.remove("user");
    },
    clearOtp: (state) => {
      state.otpSend = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSend = false;
      })
      .addCase(registerOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSend = true;
      })
      .addCase(registerOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(otpSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(otpSignup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
        state.signupSuccess = true;
        state.isAuthenticated = true;
      })
      .addCase(otpSignup.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.signupSuccess = false;
      });
    builder
      .addCase(verifySigninOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySigninOtp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(verifySigninOtp.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(facebookSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(facebookSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(facebookSignIn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(updateDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(updateDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(googleLoginAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(googleLoginAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
    builder
      .addCase(googleRegisterAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleRegisterAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(googleRegisterAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});
export const { logout, clearOtp } = authSlice.actions;
export default authSlice.reducer;
