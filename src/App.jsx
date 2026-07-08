import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './features/dashboard/Dashboard';
import { LandingPage } from './features/landing/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
