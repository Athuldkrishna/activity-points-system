import { useEffect, useState } from "react";


function Profile({ student, activities: allActivities }) {
  const [totalPoints, setTotalPoints] = useState(0);
  const [activityCount, setActivityCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

 useEffect(() => {
  const studentActivities = allActivities.filter(
    (activity) => activity.uid === student.uid
  );

    setActivityCount(studentActivities.length);

    const approvedPoints = studentActivities.reduce(
      (total, activity) => total + activity.pointsApproved,
      0
    );

    setTotalPoints(approvedPoints);

    setApprovedCount(
      studentActivities.filter(
        (activity) => activity.status === "Approved"
      ).length
    );

    setPendingCount(
      studentActivities.filter(
        (activity) => activity.status === "Pending"
      ).length
    );
  }, [student]);

  const progress = Math.min(
    (totalPoints / student.targetPoints) * 100,
    100
  );

  return (
    <div className="profile-page">

      <div className="page-header">
        <div>
          <p className="page-label">Student Account</p>
          <h1>My Profile</h1>
          <p className="page-description">
            View your student information and activity summary.
          </p>
        </div>
      </div>


      <div className="profile-grid">

        {/* Student Information */}
        <div className="profile-card">

          <div className="profile-top">

            <div className="profile-avatar">
              {student.name.charAt(0)}
            </div>

            <div>
              <h2>{student.name}</h2>
              <p>{student.uid}</p>
            </div>

          </div>


          <div className="profile-details">

            <div className="detail-item">
              <span>Department</span>
              <strong>{student.department}</strong>
            </div>

            <div className="detail-item">
              <span>Semester</span>
              <strong>Semester {student.semester}</strong>
            </div>

            <div className="detail-item">
              <span>Activity Point Target</span>
              <strong>{student.targetPoints} Points</strong>
            </div>

          </div>

        </div>


        {/* Activity Summary */}
        <div className="profile-card">

          <h2 className="card-title">
            Activity Summary
          </h2>

          <div className="summary-grid">

            <div className="summary-item">
              <span>🏆</span>
              <strong>{totalPoints}</strong>
              <p>Points Earned</p>
            </div>

            <div className="summary-item">
              <span>📋</span>
              <strong>{activityCount}</strong>
              <p>Total Activities</p>
            </div>

            <div className="summary-item">
              <span>✅</span>
              <strong>{approvedCount}</strong>
              <p>Approved</p>
            </div>

            <div className="summary-item">
              <span>⏳</span>
              <strong>{pendingCount}</strong>
              <p>Pending</p>
            </div>

          </div>

        </div>

      </div>


      {/* Progress */}
      <div className="profile-card profile-progress">

        <div className="progress-header">
          <div>
            <h2>Overall Progress</h2>
            <p>
              Your current activity points achievement
            </p>
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
          <span>{student.targetPoints} points target</span>
        </div>

      </div>

    </div>
  );
}

export default Profile;