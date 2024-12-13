import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

import ProviderTemple from "./components/ProviderTemplate";
import ImageUploadPage from "./pages/ImageUploadPage";
import ResultPage from "./pages/ResultPage";

// App Component with Routes
function App() {
  return (
    <ProviderTemple>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/image" element={<ImageUploadPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </ProviderTemple>
  );
}

export default App;
