import { useEffect, useState } from "react";

import SplashScreen from "./components/SplashScreen";
import LoadingScreen from "./components/LoadingScreen";
import CharacterViewer from "./components/CharacterViewer";
import Ending from "./components/Ending";

// import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("splash");

  useEffect(() => {
    if (screen !== "splash") return;

    const timer = setTimeout(() => {
      setScreen("loading");
    }, 3500);

    return () => clearTimeout(timer);
  }, [screen]);

  const handleLoadingComplete = () => {
    setScreen("characters");
  };

  const handleJourneyFinish = () => {
    setScreen("ending");
  };

  const handleRestart = () => {
    setScreen("splash");
  };

  return (
    <>
      {screen === "splash" && <SplashScreen />}

      {screen === "loading" && (
        <LoadingScreen onFinish={handleLoadingComplete} />
      )}

      {screen === "characters" && (
        <CharacterViewer onFinish={handleJourneyFinish} />
      )}

      {screen === "ending" && (
        <Ending onRestart={handleRestart} />
      )}
    </>
  );
}