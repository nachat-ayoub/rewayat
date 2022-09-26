import { useState, useEffect } from "react";

export default function useElementHeight(ref) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref.current.offsetHeight);
  });

  return { height };
}
