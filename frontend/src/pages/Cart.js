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
    /* CUSTOMER */

    const customer = JSON.parse(
      localStorage.getItem(
        "customer"
      )
    );

    /* LOGIN CHECK */

    if (!customer) {
      alert(
        "Please login first"
      );

      window.location.href =
        "/customer-login";

      return;
    }

    /* PLACE ORDER */

    await axios.post(
      "https://qr-restaurant-app-5eik.onrender.com/orders",
      {
        tableNo,

        items: cartItems,

        total,

        customerEmail:
          customer?.email,

        customerName:
          customer?.name,
      }
    );

    /* CLEAR CART */

    localStorage.removeItem(
      "cart"
    );

    alert(
      "Order Placed Successfully"
    );

    window.location.href =
      "/history";
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
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
            }}
          >
            🛒 Your Cart
          </h1>

          <p
            style={{
              color: "#666",
            }}
          >
            Table Number:
            {" "}
            {tableNo}
          </p>
        </div>
      </div>

      {/* EMPTY */}

      {cartItems.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h2>
            Cart Empty 😔
          </h2>
        </div>
      ) : (
        <>
          {/* ITEMS */}

          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            {cartItems.map(
              (item) => (
                <div
                  key={item.id}
                  style={{
                    background:
                      "white",

                    borderRadius:
                      "20px",

                    padding:
                      "20px",

                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08)",
                  }}
                >
                  <div>
                    <h2>
                      {
                        item.name
                      }
                    </h2>

                    <p>
                      Quantity:
                      {" "}
                      {
                        item.quantity
                      }
                    </p>

                    <h3
                      style={{
                        color:
                          "#C9933A",
                      }}
                    >
                      ₹{" "}
                      {item.price *
                        item.quantity}
                    </h3>
                  </div>

                  <img
                    src={
                      item.image
                    }
                    alt={
                      item.name
                    }
                    style={{
                      width:
                        "130px",

                      height:
                        "110px",

                      objectFit:
                        "cover",

                      borderRadius:
                        "16px",
                    }}
                  />
                </div>
              )
            )}
          </div>

          {/* TOTAL */}

          <div
            style={{
              background: "white",
              marginTop: "30px",
              padding: "30px",
              borderRadius: "20px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",

                alignItems:
                  "center",
              }}
            >
              <h1>Total</h1>

              <h1
                style={{
                  color:
                    "#C9933A",
                }}
              >
                ₹ {total}
              </h1>
            </div>

            <button
              onClick={
                placeOrder
              }
              style={{
                width: "100%",

                background:
                  "#C9933A",

                border: "none",

                padding:
                  "16px",

                borderRadius:
                  "16px",

                fontWeight:
                  "bold",

                fontSize:
                  "16px",

                cursor:
                  "pointer",

                marginTop:
                  "20px",
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