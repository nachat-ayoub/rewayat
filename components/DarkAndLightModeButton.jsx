import useDarkMode from "../hooks/useDarkMode";
import ClientOnly from "../components/ClientOnly";

const DarkAndLightModeButton = ({ size }) => {
  const [theme, toggleTheme] = useDarkMode();

  const iconPercentage = 65;
  const iconSize = (size / 100) * iconPercentage ?? 16;
  return (
    <ClientOnly>
      <div
        onClick={toggleTheme}
        className={`bg-lightPurple text-white hover:bg-opacity-50 shadow transition-colors duration-300 rounded-full flex justify-center items-center cursor-pointer h-7 w-7 p-1`}
        style={
          size && {
            width: size,
            height: size,
          }
        }
      >
        <span style={{ fontSize: iconSize + "px" }}>
          {theme === "dark" ? (
            <i className="fa-solid fa-sun" />
          ) : (
            <i className="fa-solid fa-moon" />
          )}
        </span>
      </div>
    </ClientOnly>
  );
};
export default DarkAndLightModeButton;
