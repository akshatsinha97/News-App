import "./app.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

function App() {
  const apikey = process.env.REACT_APP_NEWS_API || "";
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <NavBar />
        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => progress}
        />
        <Routes>
          <Route
            path="/business"
            element={
              <News
                setProgress={setProgress}
                apikey={apikey}
                country="in"
                pageSize={6}
                category="business"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apikey={apikey}
                country="in"
                pageSize={6}
                category="entertainment"
              />
            }
          />
          <Route
            path="/general"
            element={
              <News
                setProgress={setProgress}
                apikey={apikey}
                country="in"
                pageSize={6}
                category="general"
              />
            }
          />
          <Route
            path="/"
            element={
              <News
                setProgress={setProgress}
                apikey={apikey}
                country="in"
                pageSize={6}
                category="general"
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apikey={apikey}
                country="in"
                pageSize={6}
                category="health"
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apikey={apikey}
                country="in"
                pageSize={6}
                category="science"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apikey={apikey}
                country="in"
                pageSize={6}
                category="sports"
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apikey={apikey}
                country="in"
                pageSize={6}
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
