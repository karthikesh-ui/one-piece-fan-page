import { useEffect, useState } from "react";
import "../styles/SplashScreen.css";

export default function SplashScreen({ onStart }) {
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setFadeOut(true);

    setTimeout(() => {
      onStart();
    }, 1200);
  };

  return (
    <section className={`splash ${fadeOut ? "fade-out" : ""}`}>

      {/* Background */}

      <div className="background">

        <div className="stars"></div>

        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>

        <div className="ocean"></div>

      </div>

      {/* Content */}

      <div className="content">

        <h3 className="small-title">
          Eiichiro Oda Presents
        </h3>

        <h1 className="logo">
          ONE PIECE
        </h1>

        <h2 className="subtitle">
          THE GRAND LINE JOURNEY
        </h2>

        <div className="divider"></div>

        <p className="quote">
          Every great adventure
          <br />
          begins with one step.
        </p>

        {showButton && (
          <button
            className="start-btn"
            onClick={handleStart}
          >
            START THE JOURNEY
          </button>
        )}

      </div>

      {/* Floating particles */}

      <span className="particle p1"></span>
      <span className="particle p2"></span>
      <span className="particle p3"></span>
      <span className="particle p4"></span>
      <span className="particle p5"></span>
      <span className="particle p6"></span>

    </section>
  );
}