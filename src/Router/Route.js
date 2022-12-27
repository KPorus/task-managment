import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../component/ErrorPage";
import Main from "../layout/Main";
import Home from "../Pages/Home";


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
        ]
    }
])