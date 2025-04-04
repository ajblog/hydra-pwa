import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { Home, Intro, Profile, ResetPassword, SignIn, SignUp } from "../views";
import { ForgetPassword } from "../views/ForgetPassword/ForgetPassword";
// Mock Auth Function (Replace with real cookie check)
const isAuthenticated = () => document.cookie.includes("access_token");

const hasVisitedBefore = () => localStorage.getItem("hasVisited");

const PublicRoute = () => {
  if (!isAuthenticated() && !hasVisitedBefore()) {
    return <Navigate to="/intro" replace />;
  }
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
};

// ✅ Private Route (Protects Home)
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

const NotFound = () => <h1>404 - Not Found</h1>;

export default function AppRouter() {
  // const { data } = useQuery({
  //   queryKey: ["reject-reasons"],
  //   queryFn: () => getAllStations(),
  // });

  // console.log("data", data);
  return (
    <Router>
      <Routes>
        {/* Protected Home Route */}
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />

        </Route>

        {/* Public Routes: Redirect if already authenticated */}
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Route>

        {/* Catch-All 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
