import axios from "axios";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function ManageTables() {
  const [tables, setTables] =
    useState([]);

  const [table, setTable] =
    useState("");

  useEffect(() => {
    getTables();
  }, []);

  const getTables = async () => {
    const res = await axios.get(
      "https://qr-restaurant-app-5eik.onrender.com/tables"
    );

    setTables(res.data);
  };

  const addTable = async () => {
    if (!table) return;

    await axios.post(
      "https://qr-restaurant-app-5eik.onrender.com/tables",
      {
        table,
      }
    );

    setTable("");

    getTables();
  };

  const deleteTable = async (
    table
  ) => {
    await axios.delete(
      `https://qr-restaurant-app-5eik.onrender.com/tables/${table}`
    );

    getTables();
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

      <h1
        style={{
          color: "#1A1208",
          marginBottom: "30px",
        }}
      >
        🍽 Manage Tables
      </h1>

      {/* ADD TABLE */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "18px",
          marginBottom: "40px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <input
          type="text"
          placeholder="Table Number"
          value={table}
          onChange={(e) =>
            setTable(e.target.value)
          }
          style={{
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            width: "250px",
            fontSize: "16px",
          }}
        />

        <button
          onClick={addTable}
          style={{
            background: "#C9933A",
            border: "none",
            padding: "14px 24px",
            borderRadius: "30px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Table
        </button>
      </div>

      {/* TABLES */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",

          gap: "25px",
        }}
      >
        {tables.map(
          (table, index) => (
            <div
              key={index}
              style={{
                background:
                  "white",

                borderRadius:
                  "18px",

                padding: "25px",

                textAlign:
                  "center",

                boxShadow:
                  "0 5px 18px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  color:
                    "#1A1208",
                }}
              >
                Table {table}
              </h2>

              <div
                style={{
                  margin:
                    "20px auto",
                  background:
                    "white",
                  padding:
                    "15px",
                  width: "fit-content",
                  borderRadius:
                    "12px",
                }}
              >
                <QRCode
                  value={`https://classy-squirrel-6b8387.netlify.app/?table=${table}`}
                  size={180}
                />
              </div>

              <p
                style={{
                  fontSize:
                    "14px",
                  color: "#666",
                  wordBreak:
                    "break-all",
                }}
              >
                https://classy-squirrel-6b8387.netlify.app/?table=
                {table}
              </p>

              <button
                onClick={() =>
                  deleteTable(
                    table
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
                    "12px 20px",

                  borderRadius:
                    "30px",

                  cursor:
                    "pointer",

                  marginTop:
                    "20px",
                }}
              >
                Delete Table
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ManageTables;