# **SkillHorizon - EduManage**
<img src="https://i.ibb.co.com/Mx9tZGz8/Screenshot-10.jpg" alt="Home Page Screenshot" width="100%" />

**SkillHorizon** is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed to enhance communication between educational institutions, teachers, and students. It serves as an interactive platform where students can improve their skills, enroll in courses, submit assignments, and receive feedback, while teachers can efficiently manage their classes, assignments, and student progress.  

This platform makes learning and class management easier for both students and teachers. Students can enroll in courses, submit assignments, and get feedback, while teachers can manage their classes and track student progress. **SkillHorizon** also includes an admin dashboard to oversee class approvals, teacher requests, and user roles, ensuring a smooth and organized learning experience.


## 🌐 **Live Website**  
[Visit the Live Site](https://skillhorizon-11d1f.web.app/)

## 🔑 **Admin Credentials**  
- **Email**: skillhorizonadmin@gmail.com  
- **Password**: 123Aa!

## ✨ **Key Features**  
1. **Responsive Design**: Fully responsive for all devices (mobile, tablet, desktop).  
2. **Dynamic Navbar**: Includes logo, home, classes, sign-in, and user profile dropdown.  
3. **Student Dashboard**: Private dashboard to manage classes, assignments, and provide feedback.  
4. **Teacher Dashboard**: Add classes, track progress, manage enrollments, and assign tasks.  
5. **Admin Dashboard**: Manage teacher requests, user roles, class approvals, and class progress.  
6. **Private Routes**: Protects pages for logged-in users with JWT authentication.  
7. **Authentication**: Google and email/password login with JWT authentication.
8. **CRUD Operations**: Create, read, update, and delete operations for classes, users, and assignments with success/failure notifications.
9. **Pagination**: Pagination for user lists, classes, and assignments to improve user experience.
10. **Feedback Section**: Display feedback from teachers with their photos and ratings, collected via a Teacher Evaluation Report.
11. **Environment Variables**: Firebase and MongoDB credentials are securely stored in environment variables.

## 🛠️ **Pages and Functionalities**  
- **Home Page**: Public page with featured classes, upcoming events, and banners.  
- **Classes Page**: Displays a grid of all classes with sorting and filtering options.  
- **Student Dashboard**: Students can view enrolled classes, assignments, and feedback.
- **Teacher Dashboard**: Teachers can manage their classes, enrollments, and assignments.
- **Admin Dashboard**: Manages teacher requests, user roles, and class approvals.  
- **Login and Register Pages**: Secure login for both students and teachers via email/password or Google authentication.

---

## 🚀 **Technologies Used**

- **Frontend**: 
  - **React** (18.3.1) for building the user interface.
  - **React Router DOM** (6.28.2) for handling navigation.
  - **Tailwind CSS** (3.4.17) for utility-first CSS styling.
  - **DaisyUI** (4.12.23) for component library based on Tailwind.
  - **React Query** (5.64.2) for data fetching, caching, and synchronization.
  - **React Hook Form** (7.54.2) for form management and validation.
  - **React Hot Toast** (2.5.1) for showing toast notifications.
  - **React Icons** (5.4.0) for using icons in your application.
  - **Swiper** (11.2.1) for creating modern carousels/sliders.
  - **React Paginate** (8.2.0) for paginating lists of data.
  - **React Awesome Reveal** (4.3.1) for animations and scroll effects.
  - **SweetAlert2** (11.15.10) for beautiful alerts.
  - **Moment.js** (2.30.1) for parsing, validating, and manipulating dates.

- **Backend**:
  - **Node.js** for building the server-side logic.
  - **Express.js** for routing and handling HTTP requests.
  - **MongoDB** with **Mongoose** for storing data in a NoSQL database.
  - **Firebase** (11.2.0) for user authentication (Google, email/password).
  - **JWT Authentication** for securing API endpoints.

- **Deployment**:
  - **Vercel** for hosting the frontend application.
  - **Firebase Hosting** for deploying static files and serverless functions.
  - **MongoDB Atlas** for cloud-hosted MongoDB databases.


---

## 🛠️ **Frontend Setup**

1. Clone the repository:
    ```bash
    git clone https://github.com/Nabilabintaakter/SkillHorizon-client.git
    cd SkillHorizon-client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:5173`.

---

## 🖥️ **Backend Setup**

1. Clone the repository:
    ```bash
    git clone https://github.com/Nabilabintaakter/SkillHorizon-server.git
    cd SkillHorizon-server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables (Firebase and MongoDB credentials):
    ```bash
    touch .env
    nano .env
    ```
    Add the following inside `.env`:
    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    FIREBASE_SECRET=your_firebase_secret
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. The backend will be accessible at `https://b10-a12-skill-horizon-server.vercel.app`.

---

## **Live API**
- **API Documentation**: [SkillHorizon API](https://b10-a12-skill-horizon-server.vercel.app/)
- **Backend Repository**: [SkillHorizon Server](https://github.com/Nabilabintaakter/SkillHorizon-server)
