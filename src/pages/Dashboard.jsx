import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";

function Dashboard({ student, activities: allActivities }) {
  const [activities, setActivities] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const studentActivities = allActivities.filter(
      (activity) => activity.uid === student.uid
    );

    setActivities(studentActivities);

    const approvedPoints = studentActivities.reduce(
      (total, activity) => total + activity.pointsApproved,
      0
    );

    setTotalPoints(approvedPoints);
  }, [student, allActivities]);

  const remainingPoints = Math.max(
    student.targetPoints - totalPoints,
    0
  );

  const progress = Math.min(
    (totalPoints / student.targetPoints) * 100,
    100
  );

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <p className="welcome-text">Welcome back 👋</p>

          <h1>{student.name}</h1>

          <p className="student-details">
            {student.department} • Semester {student.semester}
          </p>
        </div>

        <div className="student-badge">
          {student.uid}
        </div>
      </div>


      <div className="stats-grid">

        <StatCard
          title="Points Earned"
          value={totalPoints}
          subtitle="Approved points"
          icon="🏆"
        />

        <StatCard
          title="Target Points"
          value={student.targetPoints}
          subtitle="Required points"
          icon="🎯"
        />

        <StatCard
          title="Remaining"
          value={remainingPoints}
          subtitle="Points to reach target"
          icon="📌"
        />

      </div>


      <div className="progress-card">

        <div className="progress-header">
          <div>
            <h2>Activity Progress</h2>
            <p>Your progress towards the required activity points</p>
          </div>

          <strong>{Math.round(progress)}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="progress-footer">
          <span>{totalPoints} points earned</span>
          <span>{student.targetPoints} points required</span>
        </div>

      </div>


      <div className="recent-section">

        <div className="section-header">
          <div>
            <h2>Recent Activities</h2>
            <p>Your latest submitted activities</p>
          </div>

          <span className="activity-count">
            {activities.length} Activities
          </span>
        </div>


        <div className="activity-list">

          {activities.length > 0 ? (
            activities.slice(0, 5).map((activity) => (

              <div className="activity-row" key={activity.id}>

                <div className="activity-info">

                  <div className="activity-icon">
                    {activity.category === "Technical"
                      ? "💻"
                      : activity.category === "Sports"
                      ? "⚽"
                      : activity.category === "Cultural"
                      ? "🎭"
                      : activity.category === "Social Service"
                      ? "🤝"
                      : "📚"}
                  </div>

                  <div>
                    <h3>{activity.title}</h3>
                    <p>
                      {activity.category} • {activity.date}
                    </p>
                  </div>

                </div>


                <div className="activity-points">
                  <strong>
                    {activity.pointsApproved} pts
                  </strong>

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
            <p className="empty-message">
              No activities found.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;