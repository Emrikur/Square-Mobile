import "./App.css";
import "./config/axiosConfig"
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import TimeReport from "./views/TimeReport";
import History from "./views/History";
import Statistics from "./views/Statistics";
import Settings from "./views/Settings";
import UserPage from "./views/userPage";
import Approvals from "./views/Approvals";
import Login from "./views/LoginPage";
import UsersHub from "./views/UsersHub";
import Error401 from "./views/401Error";
import Error403 from "./views/403Forbidden";
import Error404 from "./views/404NotFound";
import Error500 from "./views/500Error";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import CompanyCard from "./views/CompanyCard";
import Timesheets from "./views/Timesheets";
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import UserCreation from "./views/UserCreation";

function App() {
  const { token } = useAuth();

  return (
    <>
    <Routes>
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
        path="/timesheets"
        element={
          <ProtectedRoute>
            <Timesheets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/:companyname"
        element={
          <ProtectedRoute>
            <CompanyCard />
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
        path="/users-hub"
        element={
          <ProtectedRoute>
            <UsersHub />
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
        <Route
          path="/user-creation"
          element={
            <ProtectedRoute>
              <UserCreation />
            </ProtectedRoute>
          }
        />
      <Route
        path="/approvals"
        element={
          <ProtectedRoute>
            <Approvals />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<Error401 />} />

      <Route path="/forbidden" element={<Error403 />} />

      <Route path="/not-found" element={<Error404 />} />

      <Route path="/error" element={<Error500 />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
    </Routes>
<ToastContainer
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss={false}
  draggable
  pauseOnHover={false}
  theme="colored"
  position="top-right"/>
</>
);
}

export default App;
