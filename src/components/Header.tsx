import banner from "@/assets/banner.jpg";
import Wrapper from "./Wrapper";
import { useQuery } from "@tanstack/react-query";
import { mealCategoriesApi } from "@/services/themealdb.api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const mealCategoriesApiResult = useQuery({
    queryKey: ["mealCategories"],
    queryFn: async () => await mealCategoriesApi(),
  });

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div
      className={`py-12 text-white text-center`}
      style={{
        background: `linear-gradient(rgba(50, 50, 100, 0.3), rgba(50, 50, 100, 0.5)), url(${banner}) center / cover no-repeat`,
      }}
    >
      <Wrapper className="space-y-6 max-w-[700px]">
        <div className="space-y-2">
          <Link to={`/`}>
            <h3 className="font-semibold text-2xl">
              Find Meals For Your Ingredients
            </h3>
          </Link>
          <p>Real food doesn't have ingredients, real food is ingredients.</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search) {
              e.preventDefault();
              navigate(`/search/` + search);
            }
          }}
          type="text"
          placeholder="Search..."
          className="bg-transparent border outline-none rounded-full px-4 py-2 w-full"
        />
        <ul className="flex flex-wrap gap-4 items-center justify-center">
          {mealCategoriesApiResult.data?.categories?.map((item) => (
            <li key={item.idCategory}>
              <Link
                to={`/category/` + item.strCategory}
                className="px-3 p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500"
              >
                {item.strCategory}
              </Link>
            </li>
          ))}
        </ul>
      </Wrapper>
    </div>
  );
};

export default Header;
