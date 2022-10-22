import PanelSidebar from "./PanelSidebar";
import Footer from "./Footer";

const PanelLayout = ({ children }) => {
  return (
    <div dir="rtl" className="font-cairo w-full min-h-screen flex flex-col">
      <PanelSidebar>
        <main className="w-full dark:bg-secondary-900 dark:text-white">
          {children}
        </main>
      </PanelSidebar>

      <Footer />
    </div>
  );
};

export default PanelLayout;
