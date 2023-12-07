import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/table" element={<Home />} />
      <Route path="/bar_chart" element={<Home />} />
      <Route path="/scatter_plot" element={<Home />} />
      
    </Routes>
  );
}

export default App;
