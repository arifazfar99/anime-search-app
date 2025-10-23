import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import DetailsPage from "../pages/DetailsPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/anime/:id" element={<DetailsPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
