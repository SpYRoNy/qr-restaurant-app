import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post(
      "http://localhost:5000/login",
      {
        username,
        password,
      }
    );

    if (res.data.success) {
      alert("Login Successful");

      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right,#1A1208,#2D2010)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "20px",

        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "white",

          width: "100%",

          maxWidth: "420px",

          borderRadius: "22px",

          padding: "40px",

          boxShadow:
            "0 8px 30px rgba(0,0,0,0.25)",

          textAlign: "center",
        }}
      >
        {/* LOGO */}

        <div
          style={{
            fontSize: "60px",
            marginBottom: "10px",
          }}
        >
          🍛
        </div>

        <h1
          style={{
            color: "#1A1208",
            marginBottom: "10px",
          }}
        >
          Spice Route
        </h1>

        <p
          style={{
            color: "#777",
            marginBottom: "35px",
          }}
        >
          Restaurant Admin Dashboard
        </p>

        {/* USERNAME */}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={inputStyle}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        {/* LOGIN BUTTON */}

        <button
          onClick={login}
          style={{
            width: "100%",

            background: "#C9933A",

            color: "#1A1208",

            border: "none",

            padding: "16px",

            borderRadius: "14px",

            fontSize: "16px",

            fontWeight: "bold",

            cursor: "pointer",

            marginTop: "10px",

            transition: "0.3s",
          }}
        >
          Login
        </button>

        {/* DEMO */}

        <div
          style={{
            marginTop: "30px",

            background: "#F5E6C8",

            padding: "15px",

            borderRadius: "12px",

            fontSize: "14px",

            color: "#444",
          }}
        >
          <strong>
            Demo Credentials
          </strong>

          <br />
          Username: admin
          <br />
          Password: admin123
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  marginBottom: "18px",
  borderRadius: "14px",
  border: "1px solid #ddd",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

export default AdminLogin;