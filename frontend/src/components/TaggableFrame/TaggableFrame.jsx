import { useEffect, useRef, useState } from "react";
import "./TaggableFrame.css";
import carterFuneralImg from "../../assets/carterFuneral.jpg";

const names = ["Alice", "Bob", "Charlie", "Dana"];

function TaggableFrame() {
  const frameRef = useRef(null);
  const [tag, setTag] = useState(null);

  const handleClick = (e) => {
    if (!frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    setTag({ x: xPercent, y: yPercent, selected: null });
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (frameRef.current && !frameRef.current.contains(e.target)) {
        setTag(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={frameRef} onClick={handleClick} className="frame">
      <img 
        src={carterFuneralImg}
        alt="Taggable"
        className="frame-img"
      />

      {tag && (
        <div
          className="tag-container"
          style={{ left: `${tag.x}%`, top: `${tag.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <div className="tag-box"></div>
          <div className="dropdown">
            {names.map((name) => (
              <div
                key={name}
                className="dropdown-item"
                onClick={() => setTag({ ...tag, selected: name })}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaggableFrame;