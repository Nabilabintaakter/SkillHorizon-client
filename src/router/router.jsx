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
import TeacherRoute from "./TeacherRoute";
import AdminRoute from "./AdminRoute";
import MyClassAssignment from "../Pages/DashboardPages/Teacher/MyClassAssignment";
import EnrollClassDetails from "../Pages/DashboardPages/Student/EnrollClassDetails";
import AssignmentSubmissions from "../Pages/DashboardPages/Teacher/AssignmentSubmissions";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import FAQ from "../Pages/FAQ/FAQ";
import TermsAndConditions from "../Pages/TermsAndConditions/TermsAndConditions";
import Overview from "../Pages/DashboardPages/Common/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        element: <Details></Details>,
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
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/faq",
        element: <FAQ></FAQ>,
      },
      {
        path: "/terms",
        element: <TermsAndConditions></TermsAndConditions>,
      },
    ]
  },
  { 
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true, 
        element: (
          <PrivateRoute>
            <Profile></Profile>
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
      {
        path: 'my-enroll-class/:id',
        element: (
          <PrivateRoute>
            <EnrollClassDetails></EnrollClassDetails>
          </PrivateRoute>
        ),
      },
      // Teacher routes
      {
        path: 'add-class',
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <AddClass></AddClass>
            </TeacherRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-class',
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <MyClass></MyClass>
            </TeacherRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-class/:id/:email',
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <MyClassAssignment />
            </TeacherRoute>
          </PrivateRoute>
        ),
      },      
      {
        path: 'my-class-assignment-submissions/:id',
        element: (
          <PrivateRoute>
            <TeacherRoute>
              <AssignmentSubmissions></AssignmentSubmissions>
            </TeacherRoute>
          </PrivateRoute>
        ),
      },
      // Admin routes
      {
        path: 'teacher-request',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <TeacherRequest></TeacherRequest>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Users></Users>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'all-classes-admin',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllClassAdmin></AllClassAdmin>
            </AdminRoute>
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
      {
        path: 'overview',
        element: (
          <PrivateRoute>
            <Overview></Overview>
          </PrivateRoute>
        ),
      },
    ],
  }

]);

export default router;