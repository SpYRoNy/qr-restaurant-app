import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import CustomerMenu from "./pages/CustomerMenu";
import Cart from "./pages/Cart";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ManageMenu from "./pages/ManageMenu";
import ManageTables from "./pages/ManageTables";
import QrPage from "./pages/QrPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<CustomerMenu />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/admin"
          element={<AdminLogin />}
        />
        <Route
           path="/qr"
            element={<QrPage />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/manage-menu"
          element={<ManageMenu />}
        />

        <Route
          path="/manage-tables"
          element={<ManageTables />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;