import { useState } from "react";

export default function usePasswordShow() {
  const types = {
    password: "password",
    text: "text",
  };
  const [type, setType] = useState(types.password);
  const toggledType = type === types.password ? types.text : types.password;
  const toggleType = () => setType(toggledType);

  return [type, toggleType];
}
