import { useEffect, useState } from "react";
import { fetchApprovalQueue } from "./api";
import ApprovalCard from "./components/ApprovalCard";
import "./styles.css";

function App() {
  const [queue, setQueue] = useState([]);

  const loadQueue = async () => {
    try {
      const data = await fetchApprovalQueue();
      setQueue(data);
    } catch (error) {
      console.error("Error fetching queue:", error);
    }
  };

  useEffect(() => {
    loadQueue();
  }, []);

  return (
    <div className="container">
      <h1>AI Social Manager - Approval Queue</h1>
      {queue.length === 0 ? (
        <p>No posts pending approval.</p>
      ) : (
        queue.map((job) => (
          <ApprovalCard key={job.id} job={job} refresh={loadQueue} />
        ))
      )}
    </div>
  );
}

export default App;
