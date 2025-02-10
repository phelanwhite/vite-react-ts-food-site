import { MealType } from "@/types/themealdb.type";

import { Link } from "react-router-dom";

const MealItem = ({ data }: { data: MealType }) => {
  return (
    <Link
      to={`/meal/` + data.idMeal}
      className="border shadow rounded-md overflow-hidden block hover:shadow-md transition group"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={data.strMealThumb}
          alt={data.strMealThumb}
          loading="lazy"
          className="group-hover:scale-105 transition"
        />
      </div>
      <div className="p-3 space-y-3">
        <h3 className="font-semibold text-base line-clamp-1">{data.strMeal}</h3>
        <p className="line-clamp-4">{data.strInstructions}</p>
      </div>
    </Link>
  );
};

export default MealItem;
