import { NavLink } from "react-router-dom";

function Sidebar({ student, onLogout }) {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">🎓</div>

        <div>
          <h2>Activity Points</h2>
          <span>Student Portal</span>
        </div>
      </div>


      <div className="sidebar-student">

        <div className="student-avatar">
          {student.name.charAt(0)}
        </div>

        <div>
          <strong>{student.name}</strong>
          <span>{student.uid}</span>
        </div>

      </div>


      <nav className="sidebar-nav">

        <p className="nav-heading">MENU</p>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>🏠</span>
          Dashboard
        </NavLink>


        <NavLink
          to="/activities"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>📋</span>
          My Activities
        </NavLink>


        <NavLink
          to="/add-activity"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>➕</span>
          Add Activity
        </NavLink>


        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>👤</span>
          Profile
        </NavLink>

      </nav>


      <div className="sidebar-bottom">

        <button
          className="logout-button"
          onClick={onLogout}
        >
          <span>🚪</span>
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;