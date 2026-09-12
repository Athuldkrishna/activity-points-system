import { useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import activitiesData from "./data/activities.json";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import AddActivity from "./pages/AddActivity";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";

function App() {
  const [student, setStudent] = useState(null);

  const [activities, setActivities] = useState(() => {
    const savedActivities =
      localStorage.getItem("activities");

    return savedActivities
      ? JSON.parse(savedActivities)
      : activitiesData;
  });

  useEffect(() => {
    localStorage.setItem(
      "activities",
      JSON.stringify(activities)
    );
  }, [activities]);

  const handleLogin = (studentData) => {
    setStudent(studentData);
  };

  const handleLogout = () => {
    setStudent(null);
  };

  const handleActivityAdded = (newActivity) => {
    setActivities((previousActivities) => [
      ...previousActivities,
      newActivity
    ]);
  };

  if (!student) {
    return (
      <HashRouter>
        <Routes>
          <Route
            path="*"
            element={
              <Login onLogin={handleLogin} />
            }
          />
        </Routes>
      </HashRouter>
    );
  }

  return (
    <HashRouter>
      <div className="app-layout">

        <Sidebar
          student={student}
          onLogout={handleLogout}
        />

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            <Route
              path="/dashboard"
              element={
                <Dashboard
                  student={student}
                  activities={activities}
                />
              }
            />

            <Route
              path="/activities"
              element={
                <Activities
                  student={student}
                  activities={activities}
                />
              }
            />

            <Route
              path="/add-activity"
              element={
                <AddActivity
                  student={student}
                  onActivityAdded={handleActivityAdded}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  student={student}
                  activities={activities}
                />
              }
            />

            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

          </Routes>

        </main>

      </div>
    </HashRouter>
  );
}

export default App;