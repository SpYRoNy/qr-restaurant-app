import axios from "axios";
import { useEffect, useState } from "react";

function ManageMenu() {
  const [menu, setMenu] = useState([]);

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [image, setImage] =
    useState("");

  const [category, setCategory] =
    useState("");

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    const res = await axios.get(
      "https://qr-restaurant-app-5eik.onrender.com/menu"
    );

    setMenu(res.data);
  };

  const addItem = async () => {
    if (
      !name ||
      !price ||
      !image ||
      !category
    ) {
      alert("Fill all fields");

      return;
    }

    await axios.post(
      "https://qr-restaurant-app-5eik.onrender.com/menu",
      {
        name,
        price,
        image,
        category,
      }
    );

    setName("");
    setPrice("");
    setImage("");
    setCategory("");

    getMenu();

    alert("Item Added");
  };

  const deleteItem = async (id) => {
    await axios.delete(
      `http://localhost:5000/menu/${id}`
    );

    getMenu();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FDF8F0",
        padding: "30px",
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
        <h1
          style={{
            color: "#1A1208",
          }}
        >
          🍽 Manage Menu
        </h1>
      </div>

      {/* FORM */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          marginBottom: "40px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Add New Food Item</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        <button
          onClick={addItem}
          style={{
            marginTop: "20px",
            background: "#C9933A",
            border: "none",
            padding: "14px 24px",
            borderRadius: "30px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Menu Item
        </button>
      </div>

      {/* MENU GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
        }}
      >
        {menu.map((item) => (
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
                height: "220px",
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
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: "#1A1208",
                  }}
                >
                  {item.name}
                </h2>

                <span
                  style={{
                    background: "#F5E6C8",
                    padding:
                      "6px 12px",
                    borderRadius:
                      "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {item.category ||
                    "Food"}
                </span>
              </div>

              <h3
                style={{
                  color: "#C9933A",
                  marginTop: "10px",
                }}
              >
                ₹ {item.price}
              </h3>

              <button
                onClick={() =>
                  deleteItem(item.id)
                }
                style={{
                  background: "#C1121F",
                  color: "white",
                  border: "none",
                  padding:
                    "10px 18px",
                  borderRadius:
                    "30px",
                  cursor: "pointer",
                  marginTop: "15px",
                  width: "100%",
                }}
              >
                Delete Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "15px",
  outline: "none",
};

export default ManageMenu;