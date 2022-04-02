import React, { useContext } from "react";
import TimeStamp from "../utils/time-stamp";
import { Link } from "react-router-dom";
import { AddShoppingCart } from "@material-ui/icons";
import "./image-types.css";
import { deleteDish } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { CartContext } from "../../context/cart";
import useDishes from "../../hook/useDishes";
import { useHistory } from "react-router-dom";
import useUser from "../../hook/useUser";
const DishImage = ({ image, id, name, description, price }) => {
  const [isAdmin,admin] = useUser();
  console.log("from DishImage isAdmin",admin);
  const history = useHistory();
  const { addToCart } = useContext(CartContext);
  const imageSplit = image.split("?");
  const imgUrl= imageSplit[0];
  const [allDishes] = useDishes();
  const toCart = allDishes.find(dish=>dish.id === id )
  const removeDish = async (ids) => {
    try {
      if (window.confirm("Are you sure want to delete this dish?")) {
        await API.graphql(
          graphqlOperation(deleteDish, {
            input: { id: ids },
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
    {/*<Link to={`dishes/${id}`}> </Link>*/}
      <div className="wrapper">
        <div className="card">
           <img src={imgUrl} alt={name} />
        </div>
        <div className="content">
          <div className="wrapper-inside">
          <TimeStamp timeStamp={new Date().getTime()} />
            <h2 className="description">
            {description}
            </h2>
            <h2 className="description">
            {`price-${price}€`}
            </h2>
          </div>
          
        </div>
      </div>
   
    <div className="btns">{admin&&(<button  onClick={()=>removeDish(id)} className="btn">
    remove
</button>)}
<button className="btn"
    onClick={() => {
      addToCart({ ...toCart, id });
      history.push("/");
    }}
        ><AddShoppingCart /></button>
</div>

    </React.Fragment>
  );
};

export default DishImage;

