import { useState } from "react";

function App() {
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const [output, setOutput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000";

  // Resume Analyzer
  const uploadResume = async () => {
    if (!file) return alert("Upload resume first");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch(`${API_URL}/api/resume`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setOutput(data.feedback);
    setLoading(false);
  };

  // Career Guidance
  const getCareer = async () => {
    if (!skills || !goal) return alert("Enter skills & goal");

    setLoading(true);
    const res = await fetch(`${API_URL}/api/career`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skills, goal }),
    });

    const data = await res.json();
    setOutput(data.response);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>🚀 AI Career Coach</h1>

      {/* Resume Section */}
      <div style={styles.card}>
        <h3>📄 Resume Analyzer</h3>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadResume}>Analyze Resume</button>
      </div>

      {/* Career Section */}
      <div style={styles.card}>
        <h3>🧠 Career Guidance</h3>
        <textarea
          placeholder="Enter your skills..."
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <textarea
          placeholder="Enter your goal..."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button onClick={getCareer}>Get Advice</button>
      </div>

      {/* Output */}
      <div style={styles.output}>
        <h3>💡 Output</h3>
        {loading ? <p>⏳ Loading...</p> : <pre>{output}</pre>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    background: "#0f172a",
    color: "white",
    minHeight: "100vh",
    padding: "20px",
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    margin: "20px auto",
    width: "400px",
    borderRadius: "10px",
  },
  output: {
    background: "#111827",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "10px",
    whiteSpace: "pre-wrap",
  },
};

export default App;