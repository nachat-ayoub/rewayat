import { useState } from "react";

export default function useToggler() {
  const [hidden, setHidden] = useState(true);
  const toggle = () => setHidden(!hidden);

  return [hidden, toggle];
}
