import Loader from "@/components/Loader";
import Wrapper from "@/components/Wrapper";
import { mealDetailsByIdApi } from "@/services/themealdb.api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const MealIdPage = () => {
  const { id } = useParams();
  const mealDetailsByIdResult = useQuery({
    queryKey: ["mealDetailsById", id],
    queryFn: async () => (await mealDetailsByIdApi(id as string)).meals?.[0],
    enabled: !!id,
  });
  const mealDetailData = useMemo(() => {
    return mealDetailsByIdResult.data;
  }, [mealDetailsByIdResult.data]);

  const ingredientMeasureData: string[] = useMemo(() => {
    if (mealDetailData) {
      const ingredients = Object.entries(mealDetailData)
        .filter(([key, value]) => key.includes("strIngredient") && value)
        ?.map(([key, value]) => value);

      const measures = Object.entries(mealDetailData)
        .filter(([key, value]) => key.includes("strMeasure") && value)
        ?.map(([key, value]) => value);

      return ingredients.map((item, index) => measures[index] + " " + item);
    }

    return [];
  }, [mealDetailData]);

  const instructionData: string[] = useMemo(() => {
    return mealDetailData
      ? mealDetailData.strInstructions?.split("\r\n")?.filter((item) => item)
      : [];
  }, [mealDetailData]);

  return (
    <Wrapper className="space-y-8">
      {mealDetailsByIdResult.isLoading && <Loader />}
      <div>
        <button onClick={() => window.history.back()} className="btn">
          <IoMdArrowRoundBack />
          Back
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-10">
        <div className="aspect-video w-full sm:max-w-[350px] overflow-hidden rounded-md">
          <img
            src={mealDetailData?.strMealThumb}
            alt={mealDetailData?.strMeal}
            loading="lazy"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{mealDetailData?.strMeal}</h3>
          <p>
            <span className="font-semibold text-base">Category: </span>
            <Link to={`/category/` + mealDetailData?.strCategory}>
              {mealDetailData?.strCategory}
            </Link>
          </p>
          <p>
            <span className="font-semibold text-base">Area: </span>
            <Link to={`/area/` + mealDetailData?.strArea}>
              {mealDetailData?.strArea}
            </Link>
          </p>
          <p>
            <span className="font-semibold text-base">Tags: </span>
            <span>{mealDetailData?.strTags?.split(",")?.join(", ")}</span>
          </p>
          <p>
            <span className="font-semibold text-base">Source: </span>
            <Link to={mealDetailData?.strSource as string} className="link">
              go to source
            </Link>
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">1. Ingredients and measure</h3>
        <p>{ingredientMeasureData?.join(", ")}</p>
        <h3 className="font-semibold text-base">2. Instructions</h3>
        <ul>
          {instructionData?.map((item, index) => (
            <li key={index} className="odd:font-semibold even:mb-4">
              {item}
            </li>
          ))}
        </ul>
        <h3 className="font-semibold text-base">3. Youtube</h3>
        <iframe
          src={mealDetailData?.strYoutube?.replace("watch?v=", "embed/")}
          frameBorder="0"
          className="w-full max-w-[600px] aspect-video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        ></iframe>
      </div>
    </Wrapper>
  );
};

export default MealIdPage;
