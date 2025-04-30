import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { DateConverter, JsonConverter, JsonDiff } from "./components/pages";
import { Navigation } from "./components/blocks";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="utilities/" element={<DateConverter />}></Route>
          <Route
            path="utilities/jsonConverter"
            element={<JsonConverter />}
          ></Route>
          <Route path="utilities/jsonDiff" element={<JsonDiff />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
