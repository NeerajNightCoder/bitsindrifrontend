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
    <button
      onClick={handleFullScreen}
      className={isFullScreen ? "text-red-500" : "text-green-500"}
      type="button"
    >
      {isFullScreen ? "Exit FullScreen" : "Go FullScreen"}
    </button>
  );
};

export default FullScreenBtn;
