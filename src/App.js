import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyMain from "./components/main/MyMain";
import MyDetail from "./components/details/MyDetail";
import SingleDirDetails from "./components/details/SingleDirDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MyMain />} />
          <Route path="/details/:id" element={<MyDetail />} />
          <Route path="/details/dir/:id" element={<SingleDirDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
