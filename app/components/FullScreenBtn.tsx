"use client";

import { useState } from "react";

const FullScreenBtn = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  function handleFullScreen() {
    const elem = document.body;
    if (!isFullScreen && elem.requestFullscreen) {
      elem.requestFullscreen();
      setIsFullScreen(true);
    } else if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  }
  return (
    <button onClick={handleFullScreen} type="button">
      {isFullScreen ? "Exit FullScreen" : "Go FullScreen"}
    </button>
  );
};

export default FullScreenBtn;
