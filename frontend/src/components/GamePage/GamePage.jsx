import { useEffect, useState } from "react";
import TaggableFrame from "../TaggableFrame/TaggableFrame";

const API_URL = import.meta.env.VITE_API_URL;

function GamePage() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    let started = false;

    async function startSession() {
      if (started) return; // prevent duplicate calls in StrictMode
      started = true;

      try {
        const res = await fetch(`${API_URL}/game/start-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setSession(data);
      } catch (err) {
        console.error("Failed to start session:", err);
      }
    }

    startSession();
  }, []); // Run once on mount

  if (!session) return <p>Loading game...</p>;

  return <TaggableFrame sessionId={session.id} />;
}

export default GamePage;