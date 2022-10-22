import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="font-cairo w-full min-h-screen flex flex-col">
      <Navbar />
      <main
        dir="rtl"
        className="bg-white dark:bg-Black dark:text-white flex flex-1"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
