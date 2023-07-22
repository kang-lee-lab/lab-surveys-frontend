import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/Header/Header";
import InProgress from "./pages/InProgress/InProgress";
import SurveyPage from "./pages/SurveyPage/SurveyPage";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/participate" element={<InProgress />} />
          <Route path="/survey/:name" element={<SurveyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
