import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/Header/Header";
import InProgress from "./pages/InProgress/InProgress";
import SurveyPage from "./pages/SurveyPage/SurveyPage";
import Consent from "./pages/Consent/Consent";
import DataColSurveys from "./pages/DataColSurveys/DataColSurveys";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/participate" element={<Consent />} />
          <Route path="/survey/:name/results" element={<ResultsPage />} />
          <Route path="/survey/:name" element={<SurveyPage />} />
          {/*<Route path="/survey/consent/:name" element={<Consent />} />*/}
          <Route path={"/datasurveys"} element={<DataColSurveys />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
