import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const handleAuthAPIs = createAsyncThunk("handleAuthAPIs", async (dataobj) => {
    if (dataobj.reqType === 'GET') {
        const response = await fetch(URL)
        const resData = await response.json()
        return resData
    }
    console.log("this is the data under handleauthapi")
    console.log(dataobj)
    const response = await fetch(dataobj.URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataobj.signupdata)
    })
    const resData = await response.json()
    console.log("this is the resData")
    console.log(resData)
    return resData
}
)


const UserAuthSlice = createSlice({
    name: "UserAuth",
    initialState: {
        isSignUp: false,
        isAuthenticated: false,
        user: null,
        error: null,
        isEmailVerified: false,
        isPasswordForgot: false,
        isPasswordReset: false,
        isLogout: false,
        isLogin: false
    },
    extraReducers: (builder) => {
        builder.addCase(handleAuthAPIs.pending, (state, action) => {
            state.error = null
        });
        builder.addCase(handleAuthAPIs.fulfilled, (state, action) => {
            state.isLoading = false
            if (action.payload.success && action.payload.type == "Auth-User") {
                state.isAuthenticated = true
                state.user = action.payload.user
            }
            else if ((action.payload.success == true) && (action.payload.type == "Sign-Up-User")) {
                state.isSignUp = true
                state.user = action.payload
            }
            else if ((action.payload.success == true) && (action.payload.type == "Verify-User-Email")) {
                state.isEmailVerified = true
                state.user = action.payload
            }
            else if ((action.payload.success == true) && (action.payload.type == "Logout-User")) {
                state.isLogout = true
                state.user = action.payload
            }
            else if ((action.payload.success == true) && (action.payload.type == "Login-User")) {
                state.isLogin = true
                state.user = action.payload
            }
            else if ((action.payload.success == true) && (action.payload.type == "Forgot-User-Password")) {
                state.isPasswordForgot = true
                state.user = action.payload
            }
            else if ((action.payload.success == true) && (action.payload.type == "Reset-User-Password")) {
                state.isPasswordReset = true
                state.user = action.payload
            }
        });
        builder.addCase(handleAuthAPIs.rejected, (state, action) => {
            state.error = action.error.message
        });
    }
})

export default UserAuthSlice.reducer