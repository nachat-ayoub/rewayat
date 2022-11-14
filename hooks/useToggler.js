import { useState } from "react";

export default function useToggler(initial_state) {
  const [enabled, setEnabled] = useState(initial_state ?? true);
  const toggle = () => setEnabled(!enabled);

  return [enabled, toggle, setEnabled];
}
