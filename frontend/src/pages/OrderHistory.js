import axios from 'axios';
import { useEffect, useState } from 'react';

function OrderHistory() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const customer = JSON.parse(
      localStorage.getItem('customer')
    );

    const res = await axios.get(
      'https://qr-restaurant-app-5eik.onrender.com/orders'
    );

    const filtered = res.data.filter(
      (o) =>
        o.customerEmail ===
        customer?.email
    );

    setOrders(filtered.reverse());
  };

  return (
    <div
      style={{
        padding: '30px',
        background: '#FDF8F0',
        minHeight: '100vh',
      }}
    >
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            background: 'white',
            padding: '20px',
            marginTop: '20px',
            borderRadius: '16px',
          }}
        >
          <h2>
            Table {order.tableNo}
          </h2>

          <p>
            Status: {order.status}
          </p>

          {order.items.map(
            (item, index) => (
              <p key={index}>
                {item.name} x{' '}
                {item.quantity}
              </p>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
