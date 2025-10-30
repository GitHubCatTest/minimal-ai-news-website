import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopNews from './pages/TopNews';
import Finance from './pages/Finance';
import Politics from './pages/Politics';
import Tech from './pages/Tech';
import Sports from './pages/Sports';
import ChatAssistant from './components/ChatAssistant';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-offwhite">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<TopNews />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/politics" element={<Politics />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/sports" element={<Sports />} />
            {/* catch-all route: defaults to Top News */}
            <Route path="*" element={<TopNews />} />
          </Routes>
        </div>
        <ChatAssistant />
      </div>
    </Router>
  );
}

export default App;
