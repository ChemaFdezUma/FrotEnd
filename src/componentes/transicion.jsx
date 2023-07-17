import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const GraffitiAnimation = ({ in: inProp, children }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (inProp) {
      // Delay the showing of content for the desired animation effect
      setTimeout(() => {
        setShowContent(true);
      }, 500); // Adjust the delay as needed
    } else {
      setShowContent(false);
    }
  }, [inProp]);

  return (
    <CSSTransition
      in={showContent}
      timeout={500} // Adjust the duration of the animation as needed
      classNames="graffiti-animation"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default GraffitiAnimation;
