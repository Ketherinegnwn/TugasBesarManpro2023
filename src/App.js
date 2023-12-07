import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      {/* 👈 Renders at /localhost:3000/ */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
