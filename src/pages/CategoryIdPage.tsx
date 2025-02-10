import Loader from "@/components/Loader";
import MealItem from "@/components/MealItem";
import Wrapper from "@/components/Wrapper";
import { mealByCategoryApi, mealCategoriesApi } from "@/services/themealdb.api";
import { CategoryType } from "@/types/themealdb.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";

const CategoryIdPage = () => {
  const { id } = useParams();
  //   meals
  const mealByCategoryResult = useQuery({
    queryKey: ["mealByCategory", id],
    queryFn: async () => (await mealByCategoryApi(id as string)).meals,
    enabled: !!id,
  });

  //   category
  const mealCategoriesApiResult = useQuery({
    queryKey: ["mealCategories", id],
    queryFn: async () => (await mealCategoriesApi()).categories,
  });
  const categoryData: CategoryType | null = useMemo(() => {
    return mealByCategoryResult.data
      ? mealCategoriesApiResult.data?.find((item) => item.strCategory === id) ||
          null
      : null;
  }, [mealCategoriesApiResult.data]);

  return (
    <Wrapper className="space-y-8">
      {mealByCategoryResult.isLoading && <Loader />}
      <div>
        <button onClick={() => window.history.back()} className="btn">
          <IoMdArrowRoundBack />
          Back
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-10">
        <div className="aspect-video w-full sm:max-w-[350px] overflow-hidden rounded-md">
          <img
            src={categoryData?.strCategoryThumb}
            alt={categoryData?.strCategoryThumb}
            loading="lazy"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-semibold">{categoryData?.strCategory}</h3>
          <p className="whitespace-break-spaces">
            {categoryData?.strCategoryDescription}
          </p>
        </div>
      </div>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {mealByCategoryResult.data?.map((item) => (
          <li key={item.idMeal}>
            <MealItem data={item} />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default CategoryIdPage;
