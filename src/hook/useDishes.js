import React, { useCallback, useEffect, useState } from "react";
import { API } from "aws-amplify";
import {  listDishes } from '../graphql/queries';

const useDishes = () => {
  const [special_today, setSpecialToday] = useState([]);
  const [allDishes, setDishes] = useState([]);
  const fetchDishes = useCallback(async () => {
    try {
    
      const { data } = await API.graphql({
        query: listDishes,
        authMode: "API_KEY"
      });
     
      const dishes = data.listDishes.items;
      setDishes(dishes);
      
      const special_today = dishes.filter(dish => dish.special_today===true);
      setSpecialToday(special_today);
    
    } catch (err) {
      console.log(err);
    }
  },[]);
  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);
  
    return [special_today,allDishes]
  
};

export default useDishes;