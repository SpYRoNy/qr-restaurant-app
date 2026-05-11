import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerMenu() {
  const [menu, setMenu] =
    useState([]);

  const [cart, setCart] =
    useState({});

  const [selectedCategory,
    setSelectedCategory] =
    useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    const res = await axios.get(
      "http://localhost:5000/menu"
    );

    setMenu(res.data);
  };

  const addToCart = (item) => {
    const updatedCart = {
      ...cart,
      [item.id]:
        (cart[item.id] || 0) + 1,
    };

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const removeFromCart = (item) => {
    const updatedCart = {
      ...cart,
    };

    if (updatedCart[item.id] > 1) {
      updatedCart[item.id]--;
    } else {
      delete updatedCart[item.id];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const totalItems =
    Object.values(cart).reduce(
      (a, b) => a + b,
      0
    );

  const categories = [
    "All",
    ...new Set(
      menu.map(
        (item) =>
          item.category || "Food"
      )
    ),
  ];

  const filteredMenu =
    selectedCategory === "All"
      ? menu
      : menu.filter(
          (item) =>
            item.category ===
            selectedCategory
        );

  return (
    <div
      style={{
        background: "#FDF8F0",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          background: "#1A1208",
          padding: "20px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "#C9933A",
          }}
        >
          🍛 Spice Route
        </h1>

        <button
          onClick={() =>
            navigate(
              window.location.search
                ? `/cart${window.location.search}`
                : "/cart"
            )
          }
          style={{
            background: "#C9933A",
            border: "none",
            padding: "12px 20px",
            borderRadius: "30px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🛒 Cart ({totalItems})
        </button>
      </div>

      {/* HERO */}

      <div
        style={{
          textAlign: "center",
          padding: "50px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            color: "#1A1208",
            marginBottom: "10px",
          }}
        >
          Premium Indian Cuisine
        </h1>

        <p
          style={{
            color: "#6B5744",
            fontSize: "20px",
          }}
        >
          Authentic flavors crafted
          with passion
        </p>
      </div>

      {/* CATEGORY */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          overflowX: "auto",
          padding: "0 20px 30px",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(
                cat
              )
            }
            style={{
              background:
                selectedCategory ===
                cat
                  ? "#C9933A"
                  : "white",

              color:
                selectedCategory ===
                cat
                  ? "#1A1208"
                  : "#444",

              border: "none",

              padding:
                "12px 22px",

              borderRadius:
                "30px",

              cursor: "pointer",

              fontWeight: "bold",

              whiteSpace:
                "nowrap",

              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",

          gap: "25px",

          padding: "20px",
        }}
      >
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow:
                "0 5px 18px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "240px",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                padding: "20px",
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
                <h2>
                  {item.name}
                </h2>

                <span
                  style={{
                    background:
                      "#F5E6C8",

                    padding:
                      "6px 12px",

                    borderRadius:
                      "20px",

                    fontSize:
                      "12px",

                    fontWeight:
                      "bold",
                  }}
                >
                  {item.category ||
                    "Food"}
                </span>
              </div>

              <p
                style={{
                  color: "#666",
                }}
              >
                Delicious chef special
                dish
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginTop: "20px",
                }}
              >
                <h2
                  style={{
                    color:
                      "#C9933A",
                  }}
                >
                  ₹ {item.price}
                </h2>

                {!cart[item.id] ? (
                  <button
                    onClick={() =>
                      addToCart(item)
                    }
                    style={{
                      background:
                        "#1A1208",

                      color:
                        "white",

                      border:
                        "none",

                      padding:
                        "12px 22px",

                      borderRadius:
                        "30px",

                      cursor:
                        "pointer",
                    }}
                  >
                    Add
                  </button>
                ) : (
                  <div
                    style={{
                      display:
                        "flex",

                      gap: "10px",

                      alignItems:
                        "center",
                    }}
                  >
                    <button
                      onClick={() =>
                        removeFromCart(
                          item
                        )
                      }
                      style={
                        qtyBtn
                      }
                    >
                      -
                    </button>

                    <span>
                      {
                        cart[
                          item.id
                        ]
                      }
                    </span>

                    <button
                      onClick={() =>
                        addToCart(item)
                      }
                      style={
                        qtyBtn
                      }
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const qtyBtn = {
  background: "#C9933A",
  border: "none",
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
};

export default CustomerMenu;