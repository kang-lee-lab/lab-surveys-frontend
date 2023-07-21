import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/Header/Header";
import InProgress from "./pages/InProgress/InProgress";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/participate" element={<InProgress />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
