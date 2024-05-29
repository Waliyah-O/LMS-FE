const Card = ({ children }) => {
  return (
    <div>
      <div className="">
        <div className="relative group cursor-pointer group overflow-hidden text-gray-50 h-72 w-full  rounded-2xl hover:duration-700 duration-700 gap-2">
          <div className="w-full h-72">
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Card;
