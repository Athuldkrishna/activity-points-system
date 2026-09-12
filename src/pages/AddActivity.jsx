import { useState } from "react";
import categories from "../data/categories.json";

function AddActivity({ student, onActivityAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    description: "",
    pointsClaimed: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      id: Date.now(),
      uid: student.uid,
      title: formData.title,
      category: formData.category,
      date: formData.date,
      description: formData.description,
      pointsClaimed: Number(formData.pointsClaimed),
      pointsApproved: 0,
      status: "Pending"
    };

    onActivityAdded(newActivity);

    setMessage(
      "Activity submitted successfully! It is now pending approval."
    );

    setFormData({
      title: "",
      category: "",
      date: "",
      description: "",
      pointsClaimed: ""
    });
  };

  return (
    <div className="add-page">

      <div className="page-header">
        <div>
          <p className="page-label">Activity Management</p>
          <h1>Add New Activity</h1>
          <p className="page-description">
            Submit a new activity for approval.
          </p>
        </div>
      </div>


      <div className="add-form-card">

        {message && (
          <div className="success-message">
            ✅ {message}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-field full-width">
              <label>Activity Title</label>

              <input
                type="text"
                name="title"
                placeholder="e.g. National Level Hackathon"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-field">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>


            <div className="form-field">
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-field">
              <label>Points Claimed</label>

              <input
                type="number"
                name="pointsClaimed"
                placeholder="e.g. 10"
                min="1"
                max="100"
                value={formData.pointsClaimed}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-field full-width">
              <label>Description</label>

              <textarea
                name="description"
                placeholder="Describe the activity..."
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

          </div>


          <div className="form-actions">

            <button
              type="reset"
              className="cancel-button"
              onClick={() =>
                setFormData({
                  title: "",
                  category: "",
                  date: "",
                  description: "",
                  pointsClaimed: ""
                })
              }
            >
              Clear
            </button>

            <button
              type="submit"
              className="submit-button"
            >
              Submit Activity
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddActivity;