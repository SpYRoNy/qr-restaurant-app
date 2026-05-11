const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 5000;

/* =========================
   ADMIN LOGIN
========================= */

const admin = {
  username: "admin",
  password: "admin123",
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === admin.username &&
    password === admin.password
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

/* =========================
   CUSTOMER USERS
========================= */

let customers = [];

/* CUSTOMER REGISTER */

app.post("/customer-register", (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;

  const existingUser = customers.find(
    (user) => user.email === email
  );

  if (existingUser) {
    return res.json({
      success: false,
      message: "User already exists",
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  customers.push(newUser);

  res.json({
    success: true,
    user: newUser,
  });
});

/* CUSTOMER LOGIN */

app.post("/customer-login", (req, res) => {
  const { email, password } =
    req.body;

  const user = customers.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (user) {
    res.json({
      success: true,
      user,
    });
  } else {
    res.json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

/* =========================
   MENU ITEMS
========================= */

let menu = [
  {
    id: 1,
    name: "Burger",
    price: 120,
    category: "Fast Food",
    description:
      "Delicious chef special dish",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    available: true,
  },

  {
    id: 2,
    name: "Pizza",
    price: 250,
    category: "Italian",
    description:
      "Cheesy loaded pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    available: true,
  },

  {
    id: 3,
    name: "Pasta",
    price: 180,
    category: "Italian",
    description:
      "Creamy white sauce pasta",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    available: true,
  },

  {
    id: 4,
    name: "Dal Makhni",
    price: 450,
    category: "Indian",
    description:
      "Rich creamy dal makhni",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    available: true,
  },
];

/* GET MENU */

app.get("/menu", (req, res) => {
  res.json(menu);
});

/* ADD MENU ITEM */

app.post("/menu", (req, res) => {
  const {
    name,
    price,
    category,
    description,
    image,
  } = req.body;

  const item = {
    id: Date.now(),
    name,
    price,
    category,
    description,
    image,
    available: true,
  };

  menu.push(item);

  res.json({
    success: true,
    item,
  });
});

/* DELETE MENU ITEM */

app.delete("/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);

  menu = menu.filter(
    (item) => item.id !== id
  );

  res.json({
    success: true,
  });
});

/* UPDATE MENU ITEM */

app.put("/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const itemIndex = menu.findIndex(
    (item) => item.id === id
  );

  if (itemIndex !== -1) {
    menu[itemIndex] = {
      ...menu[itemIndex],
      ...req.body,
    };

    res.json({
      success: true,
      item: menu[itemIndex],
    });
  } else {
    res.json({
      success: false,
    });
  }
});

/* =========================
   TABLES
========================= */

let tables = [1, 2, 3, 4, 5];

app.get("/tables", (req, res) => {
  res.json(tables);
});

app.post("/tables", (req, res) => {
  const { table } = req.body;

  if (!tables.includes(table)) {
    tables.push(table);
  }

  res.json({
    success: true,
  });
});

app.delete("/tables/:table", (req, res) => {
  const table = req.params.table;

  tables = tables.filter(
    (t) => t != table
  );

  res.json({
    success: true,
  });
});

/* =========================
   ORDERS
========================= */

let orders = [];

/* PLACE ORDER */

app.post("/orders", (req, res) => {
  const {
    tableNo,
    items,
    total,
    customerEmail,
    customerName,
  } = req.body;

  const order = {
    id: Date.now(),

    tableNo,

    items,

    total,

    customerEmail,

    customerName,

    status: "Pending",

    time: new Date().toLocaleTimeString(),
  };

  orders.push(order);

  res.json({
    success: true,
    order,
  });
});

/* GET ALL ORDERS */

app.get("/orders", (req, res) => {
  res.json(orders);
});

/* CUSTOMER ORDER HISTORY */

app.get(
  "/customer-orders/:email",
  (req, res) => {
    const email =
      req.params.email;

    const customerOrders =
      orders.filter(
        (order) =>
          order.customerEmail ===
          email
      );

    res.json(customerOrders);
  }
);

/* COMPLETE ORDER */

app.put(
  "/orders/:id/complete",
  (req, res) => {
    const id = parseInt(
      req.params.id
    );

    const order = orders.find(
      (o) => o.id === id
    );

    if (order) {
      order.status =
        "Completed";

      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  }
);

/* DELETE ORDER */

app.delete("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);

  orders = orders.filter(
    (order) => order.id !== id
  );

  res.json({
    success: true,
  });
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});