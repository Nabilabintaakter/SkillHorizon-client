import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Login from "../Authentication/Login/Login";
import Home from "../Pages/Home/Home/Home";
import AllClasses from "../Pages/AllClasses/AllClasses/AllClasses";
import TeachOnSkill from "../Pages/TeachOnSkill/TeachOnSkill/TeachOnSkill";
import SignUp from "../Authentication/SignUp/SignUp";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element:<Home></Home>,
        },
        {
          path: "/allClasses",
          element:<AllClasses></AllClasses>,
        },
        {
          path: "/teachOnSkill",
          element:<TeachOnSkill></TeachOnSkill>,
        },
        {
          path: "/login",
          element:<Login></Login>,
        },
        {
          path: "/signUp",
          element:<SignUp></SignUp>,
        },
      ]
    },
  ]);

export default router;