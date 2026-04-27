import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Dashboard from './views/Dashboard'
import TimeReport from './views/TimeReport'
import History from './views/History'
import Statistics from './views/Statistics'
import Settings from './views/Settings'
import Login from './views/LoginPage'
// import type { JSX } from 'react'

function App() {

  /* function ProtectedRoute({ children }: { children: JSX.Element }) {
    if(!isAuthenticated){
      return <Navigate to="/login" />;
    }
    return children;
  } */

  return (
    <Routes>
      <Route path="/"
      element={/* isAuthenticated ? <Navigate to="/dashboard" /> : */ <Navigate to="/login" /> } />

      //!TODO Needs fixing, currently allows access to dashboard without login, but should redirect to login if not authenticated
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/time-report" element={<TimeReport />} />
      <Route path="/history" element={<History />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default App
