import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Workspace from "./pages/Landing/Workspace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;