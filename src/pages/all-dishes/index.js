import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { deleteDish } from "../../graphql/mutations";
import useUser from "../../hook/useUser";
import useDishes from "../../hook/useDishes";
import { listDishes } from "../../graphql/queries";
import "./all-dishes.css";
import DishImage from "../../components/image-types";

const AllDishes = () => {
  const [allDishes] = useDishes();
  const [isAdmin] = useUser();

  if (!allDishes.length) {
    return <h3>No Dishes Available</h3>;
  }

  return (
    <React.Fragment>
        <h1 className="featured-head">Available food items</h1>
      <div className="dishes">
        {allDishes.map(({ image, id, name, description, price }) => {
          const images = image.split("?");
          const imgUrl = images[0];
          return (
            <React.Fragment>
              <div className="item-wrapper">
                <div className="item" key={id}>
                  <DishImage
                    image={imgUrl}
                    id={id}
                    name={name}
                    description={description}
                    price={price}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default AllDishes;
