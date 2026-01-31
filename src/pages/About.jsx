export default function About() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1>About This Project</h1>
      <p>
        This project is a MERN (MongoDB, Express, React, Node.js) learning
        application built by students.
      </p>
      <p>
        It demonstrates CRUD operations, frontend-backend communication, and
        database integration all in a beginner-friendly way.
      </p>
    </div>
  );
}
