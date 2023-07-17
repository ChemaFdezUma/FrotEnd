import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SpectacularAnimation = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    // Define the animation timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Initial position and scale
    tl.set(element, { x: -100, scale: 0 });

    // Animate rotation and scale
    tl.to(element, { duration: 2, rotation: 360, scale: 1, ease: 'power1.inOut' });

    // Change background color
    tl.to(element, { duration: 1, backgroundColor: '#FF00FF', ease: 'power1.inOut' });

    // Pulsating background color
    tl.to(element, { duration: 1, backgroundColor: '#00FFFF', yoyo: true, repeat: -1, ease: 'power1.inOut' });
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        width: 200,
        height: 200,
        borderRadius: '50%',
        backgroundColor: '#00FFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      }}
    >
      Spectacular Animation
    </div>
  );
};

export default SpectacularAnimation;
