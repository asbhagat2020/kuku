

// import { toast } from "react-hot-toast";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import Cookies from "js-cookie";

// const user =
//   typeof window !== "undefined" && Cookies.get("user")
//     ? JSON.parse(Cookies.get("user"))
//     : {
//         _id: "",
//         username: "",
//         name: "",
//       };
// const token =
//   typeof window !== "undefined" && Cookies.get("auth")
//     ? JSON.parse(Cookies.get("auth"))
//     : null;

// const initialState = {
//   user: user,
//   token: token,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
//   otpSend: false,
//   signupSuccess: false,
// };



// export const registerOtp = createAsyncThunk(
//   "auth/sendRegistrationOtp",
//   async ({ emailOrPhone }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/otp`,
//         { emailOrPhone }
//       );
//       toast.success(response?.data?.message);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to send OTP");
//       return rejectWithValue(error.response?.data?.message || "Signup failed");
//     }
//   }
// );

// export const googleSignUp = createAsyncThunk(
//   "auth/googleSignUp",
//   async ({ session, status }, { rejectWithValue }) => {
//     console.log(session.user.email);
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/social`,
//         {
//           email: session.user.email,
//           name: session.user.name,
//         }
//       );
//       console.log(response.data);
//       toast.success("Sign up successful");
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Google signup failed");
//       return rejectWithValue(
//         error.response?.data?.error || "An error occurred"
//       );
//     }
//   }
// );

// export const googleSignIn = createAsyncThunk(
//   "auth/googleSignIn",
//   async ({ session }, { rejectWithValue }) => {
//     console.log(session);

//     try {
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
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Google signin failed");
//       return rejectWithValue(
//         error.response?.data?.error || "An error occurred"
//       );
//     }
//   }
// );


// export const signinOtp = createAsyncThunk(
//   "auth/sendSigninOtp",
//   async ({ emailOrPhone }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/otp`,
//         { emailOrPhone } // Updated to use emailOrPhone
//       );
//       toast.success(response?.data?.message);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to send OTP");
//       return rejectWithValue(error.response?.data?.message || "Sign-In OTP failed");
//     }
//   }
// );

// export const verifySigninOtp = createAsyncThunk(
//   "auth/otpSignIn",
//   async ({ emailOrPhone, otp }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/login/verify`,
//         { emailOrPhone, otp: +otp }
//       );
//       Cookies.set("auth", JSON.stringify(response.data.token));
//       Cookies.set("user", JSON.stringify(response.data.user));
//       toast.success("Login successful");
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.message || "Invalid OTP");
//       return rejectWithValue(error.response?.data?.message || "OTP Sign-In failed");
//     }
//   }
// );




// export const otpSignup = createAsyncThunk(
//   "auth/otpSignup",
//   async ({ emailOrPhone, otp }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/register/verify`,
//         { emailOrPhone, otp: +otp }
//       );
//       toast.success(response.data.message);
//       return response.data.user;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "OTP verification failed");
//       console.error(error);
//       return rejectWithValue(error.response?.data?.message || "OTP Signup failed");
//     }
//   }
// );


// export const facebookSignIn = createAsyncThunk(
//   "auth/facebookSignIn",
//   async (_, { rejectWithValue }) => {
//     // try {
//     //   const result = await signIn('facebook', { redirect: false });
//     //   if (result?.error) {
//     //     throw new Error(result.error);
//     //   }
//     //   return result?.user; // Return user data on successful login
//     // } catch (error) {
//     //   return rejectWithValue(error.message); // Return error message on failure
//     // }
//   }
// );



// export const updateDetails = createAsyncThunk(
//   "auth/updateDetails",
//   async (
//     { KukuUsername, fullName, Description, phone, location, isChecked, id },
//     { rejectWithValue }
//   ) => {
//     console.log(fullName);

//     try {
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
//       Cookies.set("user", JSON.stringify(response.data.user));
//       console.log(response.data.message);
//       toast.success(response.data.message);
//       return response.data.user;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Update failed";
//       const errorField = error.response?.data?.field;
      
//       toast.error(errorMessage);
      
//       // Return both message and field info for better handling
//       return rejectWithValue({
//         message: errorMessage,
//         field: errorField
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
//         state.otpSend = true; // Mark signup as successful
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
//         state.user = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(otpSignup.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//         state.signupSuccess = false;
//       });

//     // Google Sign-Up reducers
//     builder
//       .addCase(googleSignUp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(googleSignUp.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(googleSignUp.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       });

//     // OTP Sign-In reducers
//     builder
//       .addCase(verifySigninOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifySigninOtp.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.loading = false;
//       })
//       .addCase(verifySigninOtp.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       });

//     // Facebook Sign-In reducers
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
//       .addCase(googleSignIn.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(googleSignIn.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(googleSignIn.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       });
//   },
// });

// export const { logout, clearOtp } = authSlice.actions;
// export default authSlice.reducer;






import { toast } from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const user =
  typeof window !== "undefined" && Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : {
        _id: "",
        username: "",
        name: "",
      };
const token =
  typeof window !== "undefined" && Cookies.get("auth")
    ? JSON.parse(Cookies.get("auth"))
    : null;

const initialState = {
  user: user,
  token: token,
  isAuthenticated: false,
  loading: false,
  error: null,
  otpSend: false,
  signupSuccess: false,
};

// Register OTP - countryCode remove kiya
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
      const errorMessage = error.response?.data?.message || "Failed to send OTP";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const googleSignUp = createAsyncThunk(
  "auth/googleSignUp",
  async ({ session, status }, { rejectWithValue }) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
        toast.error("Server configuration error. Please contact support.");
        return rejectWithValue("Server configuration error");
      }
      console.log("Google Sign-Up request for:", session.user.email);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/social`,
        {
          email: session.user.email,
          name: session.user.name,
        }
      );
      toast.success("Sign up successful");
      return response.data;
    } catch (error) {
      console.error("googleSignUp error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage = error.response?.data?.message || "Google signup failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ session }, { rejectWithValue }) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
        toast.error("Server configuration error. Please contact support.");
        return rejectWithValue("Server configuration error");
      }
      console.log("Google Sign-In request for:", session?.user?.email);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/social`,
        {
          email: session?.user?.email,
        }
      );
      Cookies.set("auth", JSON.stringify(response.data.token));
      Cookies.set("user", JSON.stringify(response.data.user));
      toast.success("Sign in successful");
      return response.data;
    } catch (error) {
      console.error("googleSignIn error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage = error.response?.data?.message || "Google signin failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Signin OTP - countryCode remove kiya
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
      const errorMessage = error.response?.data?.message || "Failed to send OTP";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Verify Signin OTP - countryCode remove kiya
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

// OTP Signup - already no countryCode
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
      
      Cookies.set("auth", JSON.stringify(response.data.token));
      Cookies.set("user", JSON.stringify(response.data.user));
      toast.success(response.data.message || "Registration successful");
      return response.data;
    } catch (error) {
      console.error("otpSignup error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage = error.response?.data?.message || "OTP verification failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const facebookSignIn = createAsyncThunk(
  "auth/facebookSignIn",
  async (_, { rejectWithValue }) => {
    // Placeholder for Facebook Sign-In
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
    { KukuUsername, fullName, Description, phone, location, isChecked, id },
    { rejectWithValue }
  ) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
        toast.error("Server configuration error. Please contact support.");
        return rejectWithValue("Server configuration error");
      }
      console.log("Updating details for user ID:", id);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/update/details/${id}`,
        {
          username: KukuUsername,
          name: fullName,
          phone: phone,
          description: Description,
          location: location,
          anonymous: !isChecked,
        }
      );
      Cookies.set("auth", JSON.stringify(response.data.token));
      Cookies.set("user", JSON.stringify(response.data.user));
      toast.success(response.data.message || "Details updated successfully");
      return response.data.user;
    } catch (error) {
      console.error("updateDetails error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage = error.response?.data?.message || "Update failed";
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
      .addCase(googleSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(googleSignUp.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
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
  },
});

export const { logout, clearOtp } = authSlice.actions;
export default authSlice.reducer;