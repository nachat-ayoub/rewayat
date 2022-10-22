import { useState } from "react";

export default function useDropdownMenu() {
  const [isOpen, setIsOpen] = useState(null);

  const toggleDropdown = (params) =>
    setIsOpen((val) => {
      if (typeof params?.init !== "undefined" && params?.init) return null;
      if (val === null) return true;
      else return !val;
    });

  return [isOpen, toggleDropdown];
}
