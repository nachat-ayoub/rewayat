const Container = ({ children, className }) => {
  return (
    <div className={`py-8 px-6 md:px-6 w-full ${className ?? ""}`}>
      {children}
    </div>
  );
};

export default Container;
