import { useMemo, useState } from 'react';

const useHover = () => {
  const [hovered, setHovered] = useState(false);

  const eventHandlers = useMemo(
    () => ({
      onMouseEnter() {
        setHovered(true);
      },
      onMouseLeave() {
        setHovered(false);
      },
    }),
    [],
  );

  return { hovered, eventHandlers };
};

export default useHover;
