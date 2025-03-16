import { BrowserRouter as Router, Route, Routes } from "react-router";
import DateConverter from "./components/pages/DateConverter";
import JsonConverter from "./components/pages/JsonConverter";
import JsonDiff from "./components/pages/JsonDiff";
import Navigation from "./components/blocks/Navigation";

function App() {
  return (
    <div className="App">
      <h1>Utilities</h1>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<DateConverter />}></Route>
          <Route path="/jsonConverter" element={<JsonConverter />}></Route>
          <Route path="/jsonDiff" element={<JsonDiff />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
