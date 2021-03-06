import { useState, useCallback, useEffect } from 'react';

const KEYBOARD_KEYS = {
  ENTER: 13,
  TAB: 9,
  LEFT: 37,
  RIGHT: 39,
};

const ENABLED_KEYS = Object.values(KEYBOARD_KEYS);
const CONTROL_ACTIVE = 5000;

const useInteraction = () => {
  const [click, setClick] = useState(0);
  const [active, setActive] = useState(false);

  // Will be triggered when we change active or click state
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setActive(false), CONTROL_ACTIVE);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [active, click, setActive]);

  // Called when the user interact with the player
  const handlePlayerInteraction = useCallback(() => {
    setActive(true);
    setClick(click + 1);
  }, [setActive, click, setClick]);

  // Handle Allowed keys to show the player
  const onKeyUp = useCallback(
    ({ keyCode }) => {
      ENABLED_KEYS.includes(keyCode) && handlePlayerInteraction();
    },
    [handlePlayerInteraction]
  );

  return { onKeyUp, active, handlePlayerInteraction };
};

export default useInteraction;
