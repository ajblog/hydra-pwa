import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { Home, Intro, Profile, ResetPassword, SignIn, SignUp } from "../views";
import { ForgetPassword } from "../views/ForgetPassword/ForgetPassword";

const isAuthenticated = () => document.cookie.includes("access_token");
const hasVisitedBefore = () =>
  localStorage.getItem("hasVisited") === "true" ? true : false;

const PublicRoute = () => {
  const isAuth = isAuthenticated();
  const visited = hasVisitedBefore();
  const isIntroPage = window.location.pathname === "/intro";

  if (!isAuth && !visited && !isIntroPage) {
    return <Navigate to="/intro" replace />;
  }

  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

const NotFound = () => <h1>404 - Not Found</h1>;

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* ✅ Keep /intro separate so it renders properly */}
        <Route path="/intro" element={<Intro />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
