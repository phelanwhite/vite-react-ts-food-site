import MealItem from "@/components/MealItem";
import Wrapper from "@/components/Wrapper";
import { searchMealByNameApi } from "@/services/themealdb.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { id } = useParams();

  const searchMealByNameResult = useQuery({
    queryKey: ["searchMealByName", id],
    queryFn: async () => {
      const response = await searchMealByNameApi(id as string);
      return response.meals;
    },
    enabled: !!id,
  });
  return (
    <Wrapper className="space-y-4">
      <h3 className="text-base">
        Search Results for <span className="font-semibold">{id}</span>
      </h3>
      {searchMealByNameResult.data?.length === 0 && "No results found"}
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {searchMealByNameResult.data?.map((item) => (
          <li key={item.idMeal}>
            <MealItem data={item} />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default SearchPage;
