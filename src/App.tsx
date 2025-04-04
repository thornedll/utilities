import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
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
          <Route path="utilities/" element={<DateConverter />}></Route>
          <Route path="utilities/jsonConverter" element={<JsonConverter />}></Route>
          <Route path="utilities/jsonDiff" element={<JsonDiff />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
