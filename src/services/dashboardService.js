import axios from './axios';

export default class DashboardService {
  async fetchDashboard(data) {
    try {
      const response = await axios.post('api/dashboard', data);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      throw error;
    }
  }
}
