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
import AddClass from "../Pages/DashboardPages/Teacher/AddClass";
import MyClass from "../Pages/DashboardPages/Teacher/MyClass";
import TeacherRequest from "../Pages/DashboardPages/Admin/TeacherRequest";
import Users from "../Pages/DashboardPages/Admin/Users";
import Profile from "../Pages/DashboardPages/Common/Profile";
import AllClassAdmin from "../Pages/DashboardPages/Admin/AllClassAdmin";
import Details from "../Pages/Details/Details/Details";
import Payment from "../Pages/Payment/Payment";

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
        path: "/class/:id",
        element: <PrivateRoute><Details></Details></PrivateRoute>,
      },
      {
        path: "/payment/:id",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
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
      // Student route
      {
        path: 'my-enroll-class',
        element: (
          <PrivateRoute>
            <MyEnrollClass></MyEnrollClass>
          </PrivateRoute>
        ),
      },
      // Teacher routes
      {
        path: 'add-class',
        element: (
          <PrivateRoute>
            <AddClass></AddClass>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-class',
        element: (
          <PrivateRoute>
            <MyClass></MyClass>
          </PrivateRoute>
        ),
      },
      // Admin routes
      {
        path: 'teacher-request',
        element: (
          <PrivateRoute>
            <TeacherRequest></TeacherRequest>
          </PrivateRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <PrivateRoute>
            <Users></Users>
          </PrivateRoute>
        ),
      },
      {
        path: 'all-classes-admin',
        element: (
          <PrivateRoute>
            <AllClassAdmin></AllClassAdmin>
          </PrivateRoute>
        ),
      },
      // Common route
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ]
  }
]);

export default router;