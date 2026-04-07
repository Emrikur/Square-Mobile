import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './views/Dashboard'
import TimeReport from './views/TimeReport'
import History from './views/History'
import Statistics from './views/Statistics'
import Settings from './views/Settings'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/time-report" element={<TimeReport />} />
      <Route path="/history" element={<History />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default App
