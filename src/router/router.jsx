import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Login from "../Authentication/Login/Login";
import Home from "../Pages/Home/Home/Home";
import AllClasses from "../Pages/AllClasses/AllClasses/AllClasses";
import TeachOnSkill from "../Pages/TeachOnSkill/TeachOnSkill/TeachOnSkill";
import SignUp from "../Authentication/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

import MyEnrollClass from "../Pages/DashboardPages/Student/MyEnrollClass";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/teachOnSkill",
        element: <PrivateRoute><TeachOnSkill></TeachOnSkill></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children : [
      {
        index: true,
        element: (
          <PrivateRoute>
            <MyEnrollClass></MyEnrollClass>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-enroll-class',
        element: (
          <PrivateRoute>
            <MyEnrollClass></MyEnrollClass>
          </PrivateRoute>
        ),
      },
    ]
  }
]);

export default router;