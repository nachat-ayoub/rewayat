import { useState } from "react";

export default function useToggler(initial_state) {
  const [hidden, setHidden] = useState(initial_state ?? true);
  const toggle = () => setHidden(!hidden);

  return [hidden, toggle];
}
