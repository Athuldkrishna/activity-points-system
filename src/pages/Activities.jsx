import { useState } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../data/categories.json";

function Activities({ student, activities }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const studentActivities = activities.filter(
  (activity) => activity.uid === student.uid
);

  const filteredActivities = studentActivities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      activity.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      activity.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="activities-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <p className="page-label">Activity Management</p>
          <h1>My Activities</h1>
          <p className="page-description">
            View and manage your submitted activity points.
          </p>
        </div>

        <button
          className="add-activity-button"
          onClick={() => navigate("/add-activity")}
        >
          + Add Activity
        </button>
      </div>


      {/* Filters */}
      <div className="filter-card">

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.name}
            >
              {category.name}
            </option>
          ))}
        </select>


        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
        </select>

      </div>


      {/* Activity Count */}
      <div className="results-info">
        Showing <strong>{filteredActivities.length}</strong> of{" "}
        <strong>{studentActivities.length}</strong> activities
      </div>


      {/* Activity List */}
      <div className="activities-container">

        {filteredActivities.length > 0 ? (

          filteredActivities.map((activity) => (

            <div className="activity-card" key={activity.id}>

              <div className="activity-card-left">

                <div className="large-activity-icon">
                  {activity.category === "Technical"
                    ? "💻"
                    : activity.category === "Sports"
                    ? "⚽"
                    : activity.category === "Cultural"
                    ? "🎭"
                    : activity.category === "Social Service"
                    ? "🤝"
                    : activity.category === "Professional"
                    ? "💼"
                    : "⭐"}
                </div>

                <div className="activity-card-info">

                  <h2>{activity.title}</h2>

                  <div className="activity-meta">
                    <span>{activity.category}</span>
                    <span>•</span>
                    <span>{activity.date}</span>
                  </div>

                  <p>{activity.description}</p>

                </div>

              </div>


              <div className="activity-card-right">

                <div className="points-column">

                  <div>
                    <span>Claimed</span>
                    <strong>{activity.pointsClaimed}</strong>
                  </div>

                  <div>
                    <span>Approved</span>
                    <strong>{activity.pointsApproved}</strong>
                  </div>

                </div>


                <span
                  className={
                    activity.status === "Approved"
                      ? "status approved"
                      : "status pending"
                  }
                >
                  {activity.status}
                </span>

              </div>

            </div>

          ))

        ) : (

          <div className="no-results">
            <div>🔎</div>
            <h2>No activities found</h2>
            <p>
              Try changing your search or filters.
            </p>
          </div>

        )}

      </div>

    </div>
  );
}

export default Activities;