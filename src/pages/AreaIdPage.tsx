import Loader from "@/components/Loader";
import MealItem from "@/components/MealItem";
import Wrapper from "@/components/Wrapper";
import { mealByAreaApi } from "@/services/themealdb.api";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";

const AreaIdPage = () => {
  const { id } = useParams();
  //   meals
  const mealByAreaResult = useQuery({
    queryKey: ["mealByArea", id],
    queryFn: async () => (await mealByAreaApi(id as string)).meals,
    enabled: !!id,
  });

  return (
    <Wrapper className="space-y-4">
      {mealByAreaResult.isLoading && <Loader />}
      <h3 className="font-semibold text-base">Result by {id}</h3>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {mealByAreaResult.data?.map((item) => (
          <li key={item.idMeal}>
            <MealItem data={item} />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default AreaIdPage;
