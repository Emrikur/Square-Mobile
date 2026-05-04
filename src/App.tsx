import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './views/Dashboard'
import TimeReport from './views/TimeReport'
import History from './views/History'
import Statistics from './views/Statistics'
import Settings from './views/Settings'
import Login from './views/LoginPage'
import Error401 from './views/401Error'
import Error404 from './views/notFound'
import ProtectedRoute from './routes/ProtectedRoute'
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
      //!TODO Needs fixing, currently allows access to dashboard without login, but should redirect to login if not authenticated
      <Route path="/login" element={<Login />} />
      <Route path="/time-report" element={
        <ProtectedRoute>
          <TimeReport />
        </ProtectedRoute>} />
      <Route path="/history" element={
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      } />
      <Route path="/statistics" element={
        <ProtectedRoute>
          <Statistics />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/unauthorized" element={<Error401 />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  )
}

export default App
