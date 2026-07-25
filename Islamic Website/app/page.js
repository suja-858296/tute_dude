// Install Next.js: npx create-next-app@latest madrasahtech
'use client';
import { useState, useEffect } from 'react';

export default function MadrasahTech() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [courses, setCourses] = useState([]);

  // Fetch courses from our Node.js backend when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  // Handle Login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      alert('Login Successful! Token saved securely.');
      // In production, save this token to HTTP-only cookies or localStorage
    } else {
      alert(data.error);
    }
  };

  // Handle Stripe Checkout
  const handleCheckout = async (courseId) => {
    const res = await fetch('http://localhost:5000/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId })
    });
    
    const data = await res.json();
    if (data.url) {
      // Redirect to Stripe secure checkout page
      window.location.href = data.url; 
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>MadrasahTech E-Learning</h1>
      
      {/* 1. JWT LOGIN FORM */}
      {!token ? (
        <form onSubmit={handleLogin} style={{ marginBottom: '40px' }}>
          <h3>Student Login</h3>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ display: 'block', margin: '10px 0', padding: '8px' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ display: 'block', margin: '10px 0', padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#145038', color: 'white' }}>
            Login with JWT
          </button>
        </form>
      ) : (
        <div style={{ marginBottom: '40px', padding: '20px', background: '#e0f7fa' }}>
          <h3>Welcome to your Dashboard!</h3>
          <p>You are securely logged in.</p>
        </div>
      )}

      {/* 2. COURSE CATALOG & STRIPE PAYMENTS */}
      <h2>Available Courses</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {courses.map(course => (
          <div key={course.id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h3>{course.title}</h3>
            <p>Price: ${course.price}</p>
            <button 
              onClick={() => handleCheckout(course.id)}
              style={{ padding: '10px', background: '#C49C48', cursor: 'pointer' }}
            >
              Buy with Stripe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}