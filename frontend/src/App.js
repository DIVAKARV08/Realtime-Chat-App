import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Join />} />
        <Route path="/chat" exact element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
