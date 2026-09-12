import { useState } from "react";
import students from "../data/students.json";

function Login({ onLogin }) {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = students.find(
      (student) =>
        student.uid === uid && student.password === password
    );

    if (student) {
      setError("");
      onLogin(student);
    } else {
      setError("Invalid UID or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-icon">🎓</div>

        <h1>Activity Points</h1>
        <p className="login-subtitle">
          Student Management System
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Student UID</label>
            <input
              type="text"
              placeholder="Enter your UID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

        <div className="demo-login">
          <p>Demo Login</p>
          <span>UID: U2408001</span>
          <span>Password: student123</span>
        </div>

      </div>
    </div>
  );
}

export default Login;