import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MealIdPage from "./pages/MealIdPage";
import CategoryIdPage from "./pages/CategoryIdPage";
import { useEffect } from "react";
import AreaIdPage from "./pages/AreaIdPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const location = useLocation();
  useEffect(() => {
    scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <div className="">
      <Header />
      <div className="py-5">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/meal/:id" element={<MealIdPage />} />
          <Route path="/category/:id" element={<CategoryIdPage />} />
          <Route path="/area/:id" element={<AreaIdPage />} />
          <Route path="/search/:id" element={<SearchPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
