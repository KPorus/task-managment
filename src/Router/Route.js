import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../component/ErrorPage";
import Main from "../layout/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp"


export const route = createBrowserRouter([
    {
        path:"/",
        errorElement:<ErrorPage></ErrorPage>,
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>,
            },
            {
                path:"/signUp",
                element:<SignUp></SignUp>,
            },
            {
                path:"/login",
                element:<Login/>,
            },
        ]
    }
])