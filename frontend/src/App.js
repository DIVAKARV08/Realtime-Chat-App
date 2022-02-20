import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Join />} />
        <Route path="/chat/:name/:room"  element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
