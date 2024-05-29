// headerActions.js
import { createAction } from "@reduxjs/toolkit";

export const setPageTitle = createAction("header/setPageTitle");
export const removeNotificationMessage = createAction(
  "header/removeNotificationMessage"
);
export const showNotification = createAction("header/showNotification");
