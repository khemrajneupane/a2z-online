import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import {  listDishes } from '../graphql/queries';
import { ordering } from "../graphql/mutations";

const DishContext = React.createContext();

const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [special_today, setSpecialToday] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDishes();
  }, []);

  const checkout = async (orderDetails) => {
    const payload = {
      id: uuidv4(),
      ...orderDetails
    };
    try {
      await API.graphql(graphqlOperation(ordering, { input: payload }));
      console.log("Order has gone through!");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const { data } = await API.graphql({
        query: listDishes,
        authMode: "API_KEY"
      });
      const dishes = data.listDishs.items;
      const special_today = dishes.filter((dish) => {
        return !!dish.special_today;
      });
      setDishes(dishes);
      setSpecialToday(special_today);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DishContext.Provider value={{ dishes, special_today, loading, checkout }}>
      {children}
    </DishContext.Provider>
  );
};

export { DishContext, DishProvider };
