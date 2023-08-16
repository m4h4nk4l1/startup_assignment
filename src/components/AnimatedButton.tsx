import React, { useState } from 'react';
import { gsap } from 'gsap';
import '../animatedbutton.scss';

interface AnimatedButtonProps {
  text: string;
  disabled: boolean;
  loading: boolean;
  animationEnabled: boolean;
  onClick: () => void;
}

function AnimatedButton({ text, disabled, loading, animationEnabled, onClick }: AnimatedButtonProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleButtonClick = () => {
    if (!animationComplete) {
      const tl = gsap.timeline();
      const topElements = document.querySelectorAll('.top');
      const bottomElements = document.querySelectorAll('.bottom');

      tl.set('.calendar-ctr', {
        scale: 0.75,
      });

      tl.to(topElements, {
        rotationX: '-90deg',
        stagger: 0.3,
      }, 0)
      .to('.calendar-ctr', {
        scale: 1,
        duration: 3, 
      }, 0)
      .to(bottomElements, {
        rotationX: '0deg',
        stagger: 0.3,
      });

      tl.eventCallback('onComplete', () => {
        setAnimationComplete(true);
        onClick();
      });
    }
  };

  return (
    <div className="main-ctr">
      <div className="calendar-ctr">
        <div className="top-ctr">
          <div className="top top-0" />

          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`top top-${i}`}>
              <div className="number">{i}</div>
            </div>
          ))}

          <div className="top top-5">
            <div className="number">5</div>
          </div>
        </div>
        <div className="bottom-ctr">
          <div className="bottom bottom-0" />

          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`bottom bottom-${i}`}>
              <div className="number">{i}</div>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`w-full px-4 py-2 text-white rounded ${disabled || loading || !animationEnabled ? 'pointer-events-none' : ''}`}
        disabled={disabled || loading || !animationEnabled}
        onClick={handleButtonClick}
      >
        {loading ? 'Loading...' : text}
      </button>
      {animationComplete && (
        <div className="submitted-data">
          {/* Display user entered data here */}
        </div>
      )}
    </div>
  );
}

export default AnimatedButton;
