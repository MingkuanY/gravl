import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Track from "./pages/Track";
import Plan from "./pages/Plan";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/track" element={<Track />} />
        <Route path="/plan" element={<Plan />} />
        <Route index path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
