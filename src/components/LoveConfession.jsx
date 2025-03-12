import React, { useState, useEffect } from "react";

const LoveConfession = () => {
  const [stage, setStage] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [setConfirmed] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [crushedName, setCrushedName] = useState("");

  const message =
    "I've wanted to tell you something for a long time. Every time I see you, my heart beats a little faster. Your smile brightens my day in ways you can't imagine. I've fallen for you, and I can't keep it a secret anymore. Would you give us a chance?";

  // Generate random hearts
  useEffect(() => {
    if (stage >= 2) {
      const heartInterval = setInterval(() => {
        const newHeart = {
          id: Date.now(),
          size: 10 + Math.random() * 20,
          left: Math.random() * 100,
          animationDuration: 3 + Math.random() * 4,
          rotation: Math.random() * 45 - 22.5,
        };

        setHearts((prevHearts) => [...prevHearts, newHeart]);

        // Remove hearts after they animate out
        setTimeout(() => {
          setHearts((prevHearts) =>
            prevHearts.filter((heart) => heart.id !== newHeart.id)
          );
        }, newHeart.animationDuration * 1000);
      }, 300);

      return () => clearInterval(heartInterval);
    }
  }, [stage]);

  // Type animation effect
  useEffect(() => {
    if (showMessage && typedMessage.length < message.length) {
      const timer = setTimeout(() => {
        setTypedMessage(message.substring(0, typedMessage.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showMessage, typedMessage, message]);

  // Handling page stages
  const handleStart = () => {
    setStage(1);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setCrushedName(nameInput.trim());
      setStage(2);
      setTimeout(() => {
        setShowMessage(true);
      }, 1000);
    }
  };

  const handleConfirm = () => {
    setStage(3);
    setConfirmed(true);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-pink-100 to-pink-200 flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-md mx-auto p-6">
        {/* Floating hearts */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 text-red-500 animate-float"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.animationDuration}s`,
              transform: `rotate(${heart.rotation}deg)`,
            }}
          >
            {Math.random() > 0.5 ? "❤️" : "💖"}
          </div>
        ))}

        {/* Content card */}
        <div className="relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-700 transform">
          {/* Initial welcome screen */}
          {stage === 0 && (
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold text-pink-600">
                Special Message
              </h1>
              <p className="text-gray-600">
                Someone has something important to tell you...
              </p>
              <div className="text-4xl animate-pulse">💌</div>
              <button
                onClick={handleStart}
                className="block w-full py-3 px-6 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors shadow-md"
              >
                Open Message
              </button>
            </div>
          )}

          {/* Name input */}
          {stage === 1 && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold text-pink-600">
                Before I continue...
              </h2>
              <p className="text-gray-600">What's your name?</p>
              <form onSubmit={handleNameSubmit} className="space-y-4">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                  placeholder="Your name here..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="block w-full py-3 px-6 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors shadow-md"
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {/* Confession message */}
          {stage === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-pink-600">
                  Dear {crushedName}
                </h2>
                <div className="h-1 w-16 bg-pink-300 mx-auto mt-2"></div>
              </div>

              <div className="relative min-h-[200px] text-gray-700 leading-relaxed">
                {typedMessage}
                {typedMessage.length < message.length && (
                  <span className="inline-block w-1 h-4 ml-1 bg-pink-500 animate-pulse"></span>
                )}
              </div>

              {typedMessage === message && (
                <div className="text-center space-y-6 animate-fade-in">
                  <div className="text-5xl animate-bounce">❤️</div>
                  <button
                    onClick={handleConfirm}
                    className="block w-full py-3 px-6 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors shadow-md"
                  >
                    I Feel The Same Way
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Response screen */}
          {stage === 3 && (
            <div className="text-center space-y-6">
              <div className="text-6xl">🎉</div>
              <h2 className="text-3xl font-bold text-pink-600">Amazing!</h2>
              <p className="text-gray-700">
                I'm so happy you feel the same way, {crushedName}! This is just
                the beginning of something beautiful.
              </p>
              <div className="py-4">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                  <div className="absolute inset-0 text-8xl flex items-center justify-center">
                    ❤️
                  </div>
                </div>
              </div>
              <p className="italic text-gray-500">
                Let's make memories together...
              </p>
            </div>
          )}
        </div>

        {/* Signature */}
        {stage >= 2 && (
          <div className="text-center mt-6 text-pink-500 font-medium">
            With all my heart,
            <div className="text-xl mt-2 font-bold">Your Secret Admirer</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveConfession;
