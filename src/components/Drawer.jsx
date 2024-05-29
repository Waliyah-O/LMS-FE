import useToggleDrawer from '../hooks/useToggleDrawer';

const Drawer = ({ defaultContent, defaultText, primaryWidth, secondaryWidth, primaryContent, secondaryContent }) => {
  const toggleDrawer = useToggleDrawer();

  const drawerSection = (content, width) => (
    <section className={`menu p-4 w-full min-h-full bg-white text-base-content ${width}`}>
      <div className="w-full flex items-end justify-end">
        <button
          onClick={toggleDrawer}
          className="btn btn-sm btn-circle bg-slate-100 text-blue-900 hover:bg-blue-900 hover:text-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {content}
    </section>
  );

  return (
    <div className="drawer drawer-end z-20">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-4"
          className="text-labels rounded-md py-2.5 px-1.5 font-semibold my-1 text-white cursor-pointer"
        >
          {defaultText}
        </label>
      </div>

      <div className="drawer-side no-scrollbar">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        {defaultContent && drawerSection(defaultContent, 'md:w-1/3')}
        {primaryWidth && primaryContent && drawerSection(primaryContent, `md:${primaryWidth}`)}
        {secondaryWidth && secondaryContent && drawerSection(secondaryContent, `md:${secondaryWidth}`)}
      </div>
    </div>
  );
};

export default Drawer;
