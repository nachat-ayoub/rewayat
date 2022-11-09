import { useState } from "react";

export default function useToggler(initial_state) {
  const [shown, setShown] = useState(initial_state ?? true);
  const toggle = () => setShown(!shown);

  return [shown, toggle, setShown];
}
