import { useEffect, useRef, useState } from "react";
import "./TaggableFrame.css";
import carterFuneralImg from "../../assets/carterFuneral.jpg";

const API_URL = import.meta.env.VITE_API_URL;

// TODO: Get names dynamically through getCharacters api endpoint
const names = [
  "Al Gore",
  "Barack Obama",
  "Bill Clinton",
  "Donald Trump",
  "Doug Emhoff",
  "George W. Bush",
  "Hillary Clinton",
  "Jill Biden",
  "Joe Biden",
  "Kamala Harris",
  "Laura Bush",
  "Melania Trump",
  "Mike Pence",
];
const TAG_BOX_SIZE = 0.07; // % of image width

function TaggableFrame({ sessionId }) {
  const frameRef = useRef(null);
  const [tag, setTag] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClick = (e) => {
    if (!frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const boxSize = rect.width * TAG_BOX_SIZE;
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    setErrorMessage(null);
    setTag({ x: xPercent, y: yPercent, boxSize, selected: null });
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (frameRef.current && !frameRef.current.contains(e.target)) {
        setTag(null);
        setErrorMessage(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={frameRef} onClick={handleClick} className="frame">
      <img src={carterFuneralImg} alt="Taggable" className="frame-img" />

      {correctGuesses.map((guess) => (
        <div
          key={guess.name}
          className="marker"
          style={{
            left: `${guess.x}%`,
            top: `${guess.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          title={guess.name}
        >
          ✓
        </div>
      ))}

      {tag && (
        <div
          className="tag-container"
          style={{
            left: `${tag.x}%`,
            top: `${tag.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="tag-box"
            style={{ width: `${tag.boxSize}px`, height: `${tag.boxSize}px` }}
          ></div>
          <div className="dropdown" onClick={(e) => e.stopPropagation()}>
            {names
              .filter((n) => !correctGuesses.some((g) => g.name === n))
              .map((name) => (
                <div
                  key={name}
                  className="dropdown-item"
                  onClick={async () => {
                    setTag({ ...tag, selected: name });

                    try {
                      const res = await fetch(`${API_URL}/game/guess`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          sessionId,
                          characterName: name,
                          xPercent: tag.x,
                          yPercent: tag.y,
                        }),
                      });

                      const data = await res.json();

                      if (data.correct) {
                        setCorrectGuesses((prev) => [
                          ...prev,
                          { name, x: tag.x, y: tag.y },
                        ]);
                        setErrorMessage(null);
                      } else {
                        setErrorMessage(data.message || "Try again!");
                      }
                    } catch (err) {
                      console.error("Error submitting guess:", err);
                    }
                  }}
                >
                  {name}
                </div>
              ))}
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaggableFrame;
