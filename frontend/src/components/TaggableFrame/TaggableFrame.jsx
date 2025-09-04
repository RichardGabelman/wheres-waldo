import { useEffect, useRef, useState } from "react";
import "./TaggableFrame.css";

const names = ["Alice", "Bob", "Charlie", "Dana"];

function TaggableFrame() {
  const frameRef = useRef(null);
  const [tag, setTag] = useState(null);

  const handleClick = (e) => {
    if (!frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTag({ x, y, selected: null });
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
      {tag && (
        <div
          className="tag-container"
          style={{ left: tag.x - 20, top: tag.y - 20 }}
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