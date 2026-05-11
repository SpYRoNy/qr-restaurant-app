import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] =
    useState([]);

  const location = useLocation();

  const queryParams =
    new URLSearchParams(location.search);

  const tableNo =
    queryParams.get("table");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const storedCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || {};

    const res = await axios.get(
      "https://qr-restaurant-app-5eik.onrender.com/menu"
    );

    const menu = res.data;

    const items = Object.keys(
      storedCart
    ).map((id) => {
      const item = menu.find(
        (m) => m.id === Number(id)
      );

      return {
        ...item,
        quantity: storedCart[id],
      };
    });

    setCartItems(items);
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    await axios.post(
      "https://qr-restaurant-app-5eik.onrender.com/orders",
      {
        tableNo,
        items: cartItems,
      }
    );

    localStorage.removeItem("cart");

    alert("Order Placed");

    window.location.href =
      "/?table=" + tableNo;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FDF8F0",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>🛒 Cart</h1>

      <h3>Table Number: {tableNo}</h3>

      {cartItems.length === 0 ? (
        <h2>Cart Empty</h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "12px",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2>{item.name}</h2>

                <p>
                  Quantity:{" "}
                  {item.quantity}
                </p>

                <p>
                  ₹ {item.price}
                </p>
              </div>

              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
          ))}

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>
              Total: ₹ {total}
            </h2>

            <button
              onClick={placeOrder}
              style={{
                background: "#C9933A",
                border: "none",
                padding:
                  "14px 24px",
                borderRadius:
                  "30px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;