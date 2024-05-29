const useToggleDrawer = () => {
  const toggleDrawer = () => {
    const drawerCheckbox = document.getElementById('my-drawer-4');
    if (drawerCheckbox) {
      drawerCheckbox.checked = !drawerCheckbox.checked;
    }
  };

  return toggleDrawer;
};

export default useToggleDrawer;
