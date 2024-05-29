
import { SUSPEND_TRUE, SUSPEND_FALSE } from "../types/suspend.types";

// Define action creators
export const suspendTrue = () => ({
  type: SUSPEND_TRUE,
});

export const suspendFalse = () => ({
  type: SUSPEND_FALSE,
});
