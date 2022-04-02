import React from "react";
import HighlightImage from "../../components/highlight-image";
import DishImage from "../../components/image-types";
import useDishes from "../../hook/useDishes";
import useUser from "../../hook/useUser";
import AllDishes from "../all-dishes";

import "./home-page.css";

const Home = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const today = now.getDay();
  const [special_today] = useDishes();
  const [thisUser, isAdmin]= useUser();
  console.log("isAdmin",isAdmin)
  return (
    <div className="container">
      {thisUser&&<HighlightImage />}
      <div className="featured">
        <header className="featured-head">
          <h3>{days[today]}'s Special Dish</h3>
        </header>
        <div className="dishes">
          {special_today.slice(0, 3).map(({ id, image, name, description, price }) => (
            <div key={id} className="special">
              <DishImage
                image={image}
                id={id}
                name={name}
                description={description}
                price={price}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <AllDishes />
      </div>
    </div>
  );
};

export default Home;
