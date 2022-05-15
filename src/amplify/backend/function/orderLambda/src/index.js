const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
const ORDER_TABLE = process.env.ORDER_TABLE; 
const DISH_ORDER_TABLE = process.env.DISH_ORDER_TABLE;

const ORDER_TYPE = "Order";
const DISH_ORDER_TYPE = "DishOrder";
const registerOrder = async (payload) => {
  const { order_id, username, email, total } = payload;
  var params = {
    TableName: ORDER_TABLE,
    Item: {
      id: order_id,
      __typename: ORDER_TYPE,
      customer: email,
      user: username,
      total: total,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  };
  console.log("params from registerOrder inside orderLambda function", params);
  await documentClient.put(params).promise();
};

const createDishOrder = async (payload) => {
  let dishOrders = [];
  for (let i = 0; i < payload.cart.length; i++) {
    const cartItem = payload.cart[i];
    dishOrders.push({
      PutRequest: {
        Item: {
          id: uuidv4(),
          __typename: DISH_ORDER_TYPE,
          dish_id: cartItem.id,
          order_id: payload.order_id,
          customer: payload.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    });
  }
  let params = {
    RequestItems: {}
  };
  params["RequestItems"][DISH_ORDER_TABLE] = dishOrders;
  console.log(params);
  await documentClient.batchWrite(params).promise();
};

exports.handler = async (event) => {
  try {
    let payload = event.prev.result;
    console.log("payload from orderLambda function", payload)
    payload.order_id = uuidv4();

    await registerOrder(payload);

    await createDishOrder(payload);

    return "OK";
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};