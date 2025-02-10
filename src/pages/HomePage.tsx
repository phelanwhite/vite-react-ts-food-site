import Loader from "@/components/Loader";
import MealItem from "@/components/MealItem";
import Wrapper from "@/components/Wrapper";
import { searchMealByNameApi } from "@/services/themealdb.api";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const homeResult = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const response = await searchMealByNameApi(``);
      return response.meals;
    },
  });

  return (
    <Wrapper className="space-y-4">
      {homeResult.isLoading && <Loader />}
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {homeResult.data?.map((item) => (
          <li key={item.idMeal}>
            <MealItem data={item} />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default HomePage;
