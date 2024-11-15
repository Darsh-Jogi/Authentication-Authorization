import { createBrowserRouter } from 'react-router-dom'
import App from '../components/App.jsx'
import { SignUpPage } from '../pages/signuppage.jsx'
import { LoginPage } from '../pages/loginpage.jsx'
import { EmailVerifyPage } from '../pages/emailverifypage.jsx'
import { SamplePage } from '../pages/samplepage.jsx'

export const router = createBrowserRouter([{
    path: "/",
    element: <SignUpPage />,
},
{
    path: "/Login",
    element: <LoginPage />,
},
{
    path: "/Verify-Email",
    element: <EmailVerifyPage />
},
{
    path: "/dashboard",
    element: <SamplePage />
}
])