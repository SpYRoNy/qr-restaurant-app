import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerLogin() {
  const [isSignup, setIsSignup] =
    useState(false);

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const navigate = useNavigate();

  const submit = async () => {
    if (isSignup) {
      const res = await axios.post(
        'https://qr-restaurant-app-5eik.onrender.com/customer-register',
        {
          name,
          email,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem(
          'customer',
          JSON.stringify(res.data.customer)
        );

        navigate('/');
      }
    } else {
      const res = await axios.post(
        'https://qr-restaurant-app-5eik.onrender.com/customer-login',
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem(
          'customer',
          JSON.stringify(res.data.customer)
        );

        navigate('/');
      } else {
        alert('Invalid Credentials');
      }
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FDF8F0',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          width: '350px',
        }}
      >
        <h1>
          {isSignup
            ? 'Customer Signup'
            : 'Customer Login'}
        </h1>

        {isSignup && (
          <input
            placeholder='Name'
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />
        )}

        <input
          placeholder='Email'
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type='password'
          placeholder='Password'
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={submit}
          style={btnStyle}
        >
          {isSignup
            ? 'Signup'
            : 'Login'}
        </button>

        <p
          onClick={() =>
            setIsSignup(!isSignup)
          }
          style={{
            marginTop: '20px',
            cursor: 'pointer',
            color: '#C9933A',
          }}
        >
          {isSignup
            ? 'Already have account? Login'
            : 'Create Account'}
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px',
  marginTop: '15px',
  borderRadius: '10px',
  border: '1px solid #ddd',
  boxSizing: 'border-box',
};

const btnStyle = {
  width: '100%',
  padding: '14px',
  marginTop: '20px',
  border: 'none',
  background: '#C9933A',
  borderRadius: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default CustomerLogin;
