import { BrowserRouter as Router, Route, Routes } from "react-router";
import { DateConverter, JsonConverter, JsonDiff } from "./components/pages";
import { Navigation } from "./components/blocks";
import styles from "./assets/styles/global.module.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <div className={styles.header}>
          <h1>Utilities</h1>
          <Navigation />
        </div>
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
