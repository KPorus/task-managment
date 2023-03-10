import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../component/ErrorPage";
import Main from "../layout/Main";
import AddTask from "../Pages/AddTask";
import CompleteTask from "../Pages/CompleteTask";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp"
import UserTasks from "../Pages/UserTasks";
import PrivateRoute from "./PrivateRoute";


export const route = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: (
        <Main></Main>
    ),
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/addtask",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/taskList",
        element: (
          <PrivateRoute>
            <UserTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "/completeTask",
        element: (
          <PrivateRoute>
            <CompleteTask />
          </PrivateRoute>
        ),
      },
    ],
  },
]);