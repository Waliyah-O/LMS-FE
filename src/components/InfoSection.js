const InfoSection = ({ children, mainCard, subCardOne, subCardTwo, asideContent }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4">
        <section className="col-span-4 grid grid-rows-1 gap-3">
          {mainCard && <div>{mainCard}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subCardOne && <div>{subCardOne}</div>}

            {subCardTwo && <div>{subCardTwo}</div>}
          </div>
        </section>

        <aside className="col-span-4 md:col-span-2">{asideContent}</aside>
      </div>
      {children}
    </div>
  );
};

export default InfoSection;
