import { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks from backend
  function loadTasks() {
    setLoading(true);
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load tasks. Please check backend!");
        setLoading(false);
      });
  }

  // Load tasks on page load
  useEffect(() => {
    loadTasks();
  }, []);

  // Add Task
  function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Task title cannot be empty!");

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).then(() => {
      setTitle("");
      loadTasks();
    });
  }

  // Delete Task
  function deleteTask(id) {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => loadTasks());
  }

  // Update Task
  function updateTask(id) {
    const newTitle = prompt("Enter updated task:");
    if (!newTitle || !newTitle.trim()) return;

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, completed: false }),
    }).then(() => loadTasks());
  }

  // Toggle Completed
  function toggleCompleted(task) {
    fetch(`http://localhost:5000/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        completed: !task.completed,
      }),
    }).then(() => loadTasks());
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Task Manager
      </h2>

      {/* Add Task Form */}
      <form
        onSubmit={addTask}
        style={{ display: "flex", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />

        <button
          style={{
            padding: "10px 15px",
            borderRadius: "6px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      {/* Show Loading */}
      {loading && <p style={{ textAlign: "center" }}>Loading tasks...</p>}

      {/* Show Error */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Empty State */}
      {!loading && tasks.length === 0 && (
        <p style={{ textAlign: "center", color: "#555" }}>
          No tasks available. Add a new task!
        </p>
      )}

      {/* Tasks List */}
      <ul style={{ padding: 0, listStyle: "none" }}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f9f9f9",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task)}
              />

              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "black",
                  fontSize: "16px",
                  fontWeight: task.completed ? "normal" : "500",
                }}
              >
                {task.title}
              </span>
            </div>

            <div>
              <button
                onClick={() => updateTask(task._id)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
