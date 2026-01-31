import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <div>

      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          backgroundColor: "#4CAF50",
          color: "white",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ margin: 0 }}>Task Manager</h2>

        <div>
          <Link style={navLinkStyle} to="/">Home</Link>
          <Link style={navLinkStyle} to="/about">About</Link>
        </div>
      </nav>

      {/* ROUTES */}
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

    </div>
  );
}

// Navbar link styling
const navLinkStyle = {
  marginRight: "20px",
  fontSize: "18px",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

export default App;

