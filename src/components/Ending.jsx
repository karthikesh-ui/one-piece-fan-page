import { motion } from "framer-motion";
import "../styles/Ending.css";

export default function Ending({ onRestart }) {
  return (
    <section className="ending-page">
      <div className="ending-overlay"></div>
        <motion.h2
            className="japanese-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
        >
            海賊王に、おれはなる！
        </motion.h2>

        <motion.p
            className="english-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.25 }}
        >
            "I'm going to become the King of the Pirates!"
        </motion.p>
        <motion.div
            className="ending-content"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
        <motion.h3
          className="ending-chapter"
          initial={{ opacity: 0, letterSpacing: "20px" }}
          animate={{ opacity: 1, letterSpacing: "8px" }}
          transition={{ delay: 0.2 }}
        >
          END OF THE GRAND LINE
        </motion.h3>

        <motion.h1
          className="ending-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          The Journey Never Truly Ends
        </motion.h1>

        <motion.p
          className="ending-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Every pirate carries dreams that never fade.
          <br />
          Every adventure creates a new legend.
          <br />
          Thank you for sailing across the Grand Line.
        </motion.p>

        <motion.div
          className="ending-line"
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ delay: 1 }}
        />

        <motion.button
          className="restart-btn"
          whileHover={{
            scale: 1.05,
            y: -3
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={onRestart}
        >
          Start Another Voyage
        </motion.button>

        <motion.div
          className="ending-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.3 }}
        >
          Created With ❤️ For A One Piece Fan
        </motion.div>
      </motion.div>
      <div className="ocean"></div>

        <img
            src="/ship.png"
            alt="Thousand Sunny"
            className="sunny-ship"
        />    
      <div className="stars">
        {Array.from({ length: 40 }).map((_, index) => (
          <span
            key={index}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </section>
  );
}