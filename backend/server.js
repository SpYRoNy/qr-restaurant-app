const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ================= MENU DATA =================

let menu = [
  {
    id: 1,
    name: "Burger",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 2,
    name: "Pizza",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 3,
    name: "Pasta",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
  },
];

let orders = [];

let tables = [1, 2, 3, 4, 5];

// ================= MENU APIs =================

// GET MENU
app.get("/menu", (req, res) => {
  res.json(menu);
});

// ADD MENU ITEM
app.post("/menu", (req, res) => {
  const item = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  };

  menu.push(item);

  res.json(item);
});

// DELETE MENU ITEM
app.delete("/menu/:id", (req, res) => {
  menu = menu.filter(
    (item) => item.id != req.params.id
  );

  res.json({
    message: "Menu Item Deleted",
  });
});

// ================= ORDER APIs =================

// GET ORDERS
app.get("/orders", (req, res) => {
  res.json(orders);
});

// PLACE ORDER
app.post("/orders", (req, res) => {
  const order = {
    id: Date.now(),
    tableNo: req.body.tableNo,
    items: req.body.items,
    status: "Pending",
    time: new Date().toLocaleTimeString(),
  };

  orders.push(order);

  res.json(order);
});

// UPDATE ORDER STATUS
app.put("/orders/:id", (req, res) => {
  orders = orders.map((order) => {
    if (order.id == req.params.id) {
      return {
        ...order,
        status: req.body.status,
      };
    }

    return order;
  });

  res.json({
    message: "Order Updated",
  });
});

// DELETE ORDER
app.delete("/orders/:id", (req, res) => {
  orders = orders.filter(
    (order) => order.id != req.params.id
  );

  res.json({
    message: "Order Deleted",
  });
});

// ================= TABLE APIs =================

// GET TABLES
app.get("/tables", (req, res) => {
  res.json(tables);
});

// ADD TABLE
app.post("/tables", (req, res) => {
  tables.push(req.body.table);

  res.json({
    message: "Table Added",
  });
});

// DELETE TABLE
app.delete("/tables/:table", (req, res) => {
  tables = tables.filter(
    (table) => table != req.params.table
  );

  res.json({
    message: "Table Deleted",
  });
});

// ================= ADMIN LOGIN =================

app.post("/login", (req, res) => {
  const { username, password } =
    req.body;

  if (
    username === "admin" &&
    password === "admin123"
  ) {
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

// ================= SERVER =================

app.listen(5000, () => {
  console.log(
    "Server Running On Port 5000"
  );
});