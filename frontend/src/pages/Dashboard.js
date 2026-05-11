import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const res = await axios.get(
      "http://localhost:5000/orders"
    );

    setOrders(res.data.reverse());
  };

  const updateStatus = async (
    id,
    status
  ) => {
    await axios.put(
      `http://localhost:5000/orders/${id}`,
      {
        status,
      }
    );

    getOrders();
  };

  const deleteOrder = async (id) => {
    await axios.delete(
      `http://localhost:5000/orders/${id}`
    );

    getOrders();
  };

  const totalRevenue =
    orders.reduce((sum, order) => {
      const orderTotal =
        order.items.reduce(
          (a, item) =>
            a +
            item.price *
              item.quantity,
          0
        );

      return sum + orderTotal;
    }, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F2ED",
        fontFamily: "sans-serif",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          background: "#1A1208",
          padding: "20px 30px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              color: "#C9933A",
              margin: 0,
            }}
          >
            🍛 Spice Route
          </h1>

          <p
            style={{
              color:
                "rgba(255,255,255,0.5)",
              marginTop: "5px",
            }}
          >
            Admin Dashboard
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <Link
            to="/manage-menu"
            style={navBtn}
          >
            Manage Menu
          </Link>

          <Link
            to="/manage-tables"
            style={navBtn}
          >
            Tables
          </Link>
        </div>
      </div>

      {/* STATS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          padding: "30px",
        }}
      >
        <div style={statCard}>
          <h3>Total Orders</h3>

          <h1>{orders.length}</h1>
        </div>

        <div style={statCard}>
          <h3>Revenue</h3>

          <h1>
            ₹ {totalRevenue}
          </h1>
        </div>

        <div style={statCard}>
          <h3>Pending</h3>

          <h1>
            {
              orders.filter(
                (o) =>
                  o.status ===
                  "Pending"
              ).length
            }
          </h1>
        </div>

        <div style={statCard}>
          <h3>Completed</h3>

          <h1>
            {
              orders.filter(
                (o) =>
                  o.status ===
                  "Completed"
              ).length
            }
          </h1>
        </div>
      </div>

      {/* ORDERS */}

      <div
        style={{
          padding: "0 30px 30px",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
          }}
        >
          Live Orders
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "20px",
          }}
        >
          {orders.map((order) => {
            const orderTotal =
              order.items.reduce(
                (a, item) =>
                  a +
                  item.price *
                    item.quantity,
                0
              );

            return (
              <div
                key={order.id}
                style={{
                  background: "white",
                  borderRadius:
                    "18px",
                  padding: "20px",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08)",
                }}
              >
                {/* TOP */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                      }}
                    >
                      Table{" "}
                      {
                        order.tableNo
                      }
                    </h2>

                    <p
                      style={{
                        color:
                          "#777",
                      }}
                    >
                      {
                        order.time
                      }
                    </p>
                  </div>

                  <span
                    style={{
                      background:
                        order.status ===
                        "Completed"
                          ? "#D8F3DC"
                          : "#FFE5E7",

                      color:
                        order.status ===
                        "Completed"
                          ? "#2D6A4F"
                          : "#C1121F",

                      padding:
                        "8px 15px",

                      borderRadius:
                        "20px",

                      fontWeight:
                        "bold",
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                <hr
                  style={{
                    margin:
                      "20px 0",
                  }}
                />

                {/* ITEMS */}

                {order.items.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      style={{
                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        marginBottom:
                          "10px",
                      }}
                    >
                      <div>
                        {
                          item.name
                        }

                        {" x "}

                        {
                          item.quantity
                        }
                      </div>

                      <div>
                        ₹{" "}
                        {item.price *
                          item.quantity}
                      </div>
                    </div>
                  )
                )}

                <hr
                  style={{
                    margin:
                      "20px 0",
                  }}
                />

                {/* TOTAL */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                  }}
                >
                  <h2
                    style={{
                      color:
                        "#C9933A",
                    }}
                  >
                    ₹ {orderTotal}
                  </h2>

                  <div
                    style={{
                      display:
                        "flex",
                      gap: "10px",
                    }}
                  >
                    {order.status !==
                      "Completed" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            order.id,
                            "Completed"
                          )
                        }
                        style={{
                          background:
                            "#2D6A4F",

                          color:
                            "white",

                          border:
                            "none",

                          padding:
                            "10px 16px",

                          borderRadius:
                            "30px",

                          cursor:
                            "pointer",
                        }}
                      >
                        Complete
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteOrder(
                          order.id
                        )
                      }
                      style={{
                        background:
                          "#C1121F",

                        color:
                          "white",

                        border:
                          "none",

                        padding:
                          "10px 16px",

                        borderRadius:
                          "30px",

                        cursor:
                          "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const statCard = {
  background: "white",
  borderRadius: "18px",
  padding: "25px",
  boxShadow:
    "0 4px 15px rgba(0,0,0,0.08)",
};

const navBtn = {
  background: "#C9933A",
  color: "#1A1208",
  padding: "10px 18px",
  borderRadius: "30px",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Dashboard;