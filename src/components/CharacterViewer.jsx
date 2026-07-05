import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import characters from "../data/characters";
import "../styles/CharacterViewer.css";

export default function CharacterViewer({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showUI, setShowUI] = useState(true);

  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const hideTimer = useRef(null);

  const character = characters[currentIndex];

  useEffect(() => {
    preloadImages();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    resetUITimer();

    const keyHandler = (e) => {
      if (e.key === "ArrowRight") nextCharacter();
      if (e.key === "ArrowLeft") previousCharacter();
    };

    window.addEventListener("keydown", keyHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [currentIndex]);

  const preloadImages = () => {
    characters.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  };

  const resetUITimer = () => {
    setShowUI(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setShowUI(false);
    }, 3500);
  };

  const nextCharacter = () => {
    resetUITimer();

    if (currentIndex === characters.length - 1) {
      if (onFinish) onFinish();
      return;
    }

    setDirection(1);
    setCurrentIndex((prev) => prev + 1);
  };

  const previousCharacter = () => {
    resetUITimer();

    if (currentIndex === 0) return;

    setDirection(-1);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
    touchEnd.current = e.targetTouches[0].clientX; // Reset move tracking
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStart.current - touchEnd.current;
    if (distance > 60) nextCharacter();
    if (distance < -60) previousCharacter();
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 250 : -250,
      opacity: 0,
      scale: 1.08
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -250 : 250,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section
      className="character-page"
        style={{
        "--theme": character.theme,
        background: character.gradient
    }}
      onMouseMove={resetUITimer}
      onClick={resetUITimer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* FIXED: Removed quotation marks around {direction} */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.img
          key={character.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1]
          }}
          src={
            window.innerWidth <= 768
              ? character.image
              : character.desktop
          }
          alt={character.name}
          className="character-bg"
        />
      </AnimatePresence>

      <div className="overlay"></div>
      <div className="top-gradient"></div>
      <div className="bottom-gradient"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={character.id + "-content"}
          className={`character-content ${showUI ? "" : "hide-ui"}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.55 }}
        >
          <span className="chapter">
            {character.chapter}
          </span>

          <h1>{character.name}</h1>
          <h3>{character.title}</h3>

          <div className="quote-box">
            <p>"{character.quote}"</p>
          </div>

          <div className="navigation">
            <button
              className="nav-btn"
              onClick={previousCharacter}
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>

            <div className="page-indicator">
              {String(currentIndex + 1).padStart(2, "0")}
              {" / "}
              {String(characters.length).padStart(2, "0")}
            </div>

            <button
              className="nav-btn"
              onClick={nextCharacter}
            >
              {currentIndex === characters.length - 1
                ? "Finish Journey"
                : "Next →"}
            </button>
          </div>

          <div className="dots">
            {characters.map((item, index) => (
              <button
                key={item.id}
                className={index === currentIndex ? "dot active" : "dot"}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  resetUITimer();
                }}
                aria-label={item.name}
              />
            ))}
          </div>

          <div className="swipe-text">
            Swipe • Tap • Keyboard Arrows
          </div>

          <div className="progress-bar" aria-hidden="true">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / characters.length) * 100}%`
              }}
              transition={{ duration: 0.45 }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}