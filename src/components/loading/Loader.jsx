const Loader = ({ size, type, className, fullScreen = 'h-screen', loaderColor = 'bg-blue-500' }) => {
  return (
    <div className={`w-full ${className}  ${fullScreen ? fullScreen : 'h-full'} grid place-items-center`}>
      <span className={`loading ${size} ${type} ${loaderColor ? loaderColor : 'bg-blue-200'} `}></span>
    </div>
  );
};

export default Loader;
