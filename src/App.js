import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ContractEditorPage from './pages/ContractEditorPage';
import ContractDetailPage from './pages/ContractDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/new" element={<ContractEditorPage />} />
        <Route path="/contract/:id" element={<ContractEditorPage />} />
        <Route path="/contract/:id/detail" element={<ContractDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
