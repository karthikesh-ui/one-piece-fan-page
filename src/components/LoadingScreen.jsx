import { useEffect } from "react";
import "../styles/LoadingScreen.css";

export default function LoadingScreen({ onFinish }) {

    useEffect(() => {

        const timer = setTimeout(() => {

            onFinish();

        }, 3000);

        return () => clearTimeout(timer);

    }, [onFinish]);

    return (

        <section className="loading-screen">

            {/* Ocean */}

            <div className="loading-ocean"></div>

            {/* Stars */}

            <div className="loading-stars"></div>

            {/* Moon */}

            <div className="moon"></div>

            {/* Ship */}

            <div className="ship-container">

                <img
                    src="/ship.jpg"
                    alt="Sunny"
                    className="sunny"
                />

            </div>

            {/* Text */}

            <div className="loading-content">

                <h1>

                    Set Sail...

                </h1>

                <p>

                    Entering the Grand Line

                </p>

                <div className="loading-bar">

                    <div className="loading-progress"></div>

                </div>

            </div>

        </section>

    );

}