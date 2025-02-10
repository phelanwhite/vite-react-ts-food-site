import { CategoryType, MealType } from "@/types/themealdb.type";
import axios from "axios";

const url = `https://www.themealdb.com/api/json/v1/1/`;

export async function mealCategoriesApi() {
  return (
    await axios.get<{ categories: CategoryType[] }>(url + `categories.php`)
  ).data;
}
export async function searchMealByNameApi(name: string) {
  return (await axios.get<{ meals: MealType[] }>(url + `search.php?s=${name}`))
    .data;
}

export async function mealDetailsByIdApi(id: string) {
  return (await axios.get<{ meals: MealType[] }>(url + `lookup.php?i=${id}`))
    .data;
}

export async function mealByCategoryApi(category: string) {
  return (
    await axios.get<{ meals: MealType[] }>(url + `filter.php?c=${category}`)
  ).data;
}
export async function mealByAreaApi(area: string) {
  return (await axios.get<{ meals: MealType[] }>(url + `filter.php?a=${area}`))
    .data;
}
