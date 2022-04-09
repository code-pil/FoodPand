import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import style from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import loading from "../../assets/loader.svg";
import ERROR from "../../assets/error.svg";

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://fir-7bc54-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        setError(true);
      }

      const data = await response.json();

      let loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals();
  }, []);

  return (
    <>
      {isLoading && !error && (
        <div className={style.loading}>
          <img src={loading} alt="loading..." />
        </div>
      )}
      {error && (
        <div className={style.loading}>
          <img src={ERROR} alt="error 404" />
        </div>
      )}
      <section className={style.meals}>
        {!isLoading && !error && (
          <Card>
            {meals.map((meal) => (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            ))}
          </Card>
        )}
      </section>
    </>
  );
}
