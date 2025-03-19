import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

// Mock Auth Function (Replace with real cookie check)
const isAuthenticated = () => document.cookie.includes("auth_token");

// ✅ Private Route (Protects Home)
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/sign-up" replace />;
};

// ✅ Public Route (Redirects auth users away from /sign-in or /sign-up)
const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
};

const Home = () => <h1>Home - Protected</h1>;
const SignIn = () => <h1>Sign In</h1>;
const SignUp = () => <h1>Sign Up</h1>;
const NotFound = () => <h1>404 - Not Found</h1>;

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Protected Home Route */}
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>

        {/* Public Routes: Redirect if already authenticated */}
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* Catch-All 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
