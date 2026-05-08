import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./views/Dashboard";
import TimeReport from "./views/TimeReport";
import History from "./views/History";
import Statistics from "./views/Statistics";
import Settings from "./views/Settings";
import UserPage from "./views/userPage";
import Login from "./views/LoginPage";
import Error401 from "./views/401Error";
import Error404 from "./views/notFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
// import type { JSX } from 'react'

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      //!TODO Needs fixing, currently redirects to error page on startup, but
      should redirect to login if not authenticated
      <Route
        path="/"
        element={
          token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/time-report"
        element={
          <ProtectedRoute>
            <TimeReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/statistics"
        element={
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:userPage"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<Error401 />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
