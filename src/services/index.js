import IdentityService from './identityService';
import StorageService from './storageService';
import DashboardService from './dashboardService.js';

export const storageService = new StorageService();
export const identityService = new IdentityService();
export const dashboardService = new DashboardService();

export const BASEURL = process.env.REACT_APP_BASE_URL;
