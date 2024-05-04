import { AppThunk } from "../store/store";
import { setSidebarCollapsed } from "../uiSlice";

export const collapseSidebar = (): AppThunk => (dispatch, getState) => {
  dispatch(setSidebarCollapsed(true));
}

export const expandSidebar = (): AppThunk => (dispatch, getState) => {
  dispatch(setSidebarCollapsed(false));
}

export const toggleSidebar = (): AppThunk => (dispatch, getState) => {
  const collapsed = getState().present.ui.sidebarCollapsed;
  dispatch(setSidebarCollapsed(!collapsed));
}