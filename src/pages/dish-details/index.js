import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/cart";
import useDishes from "../../hook/useDishes";

import "./dish-details.css";

const DishDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [dishes] = useDishes();
  const { addToCart } = useContext(CartContext);
  const dish = dishes.find((dish) => dish.id === id);
  if (!dish) {
    return <h3>Loading...</h3>;
  }

  const { image, name, description, price } = dish;
  const imageSplit = image.split("?");
  const imgUrl= imageSplit[0];
  return (
    <section className="dish-details">
      <div className="detail-image">
        <img src={imgUrl} alt="images of dishes" />
      </div>
      <div className="detail-description">
        <h2>{name}</h2>
        <p>{description}</p>
        <h4>{`Price- ${price}€`}</h4>
        <button className="btn"
                  onClick={() => {
                    addToCart({ ...dish, id });
                    history.push("/");
                  }}
        >Add to Cart</button>
      </div>
    </section>
  );
};

export default DishDetails;
