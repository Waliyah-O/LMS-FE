import axios from "axios"
import { _getTokenFromSession } from "../utils"

const checkAuth = () => {
/*  Getting token value stored in sessionstorage, if token is not present we will open login page 
    for all internal dashboard routes  */
    const TOKEN = _getTokenFromSession()
    const PUBLIC_ROUTES = ["signin", "forget-password", "signup"]

    const isPublicPage = PUBLIC_ROUTES.some( r => window.location.href.includes(r))

    if(!TOKEN && !isPublicPage){
        window.location.href = '/signin'
        return;
    }else{
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`

        axios.interceptors.request.use(function (config) {
            // UPDATE: Add this code to show global loading indicator
            document.body.classList.add('loading-indicator');
            return config
          }, function (error) {
            return Promise.reject(error);
          });
          
          axios.interceptors.response.use(function (response) {
            // UPDATE: Add this code to hide global loading indicator
            document.body.classList.remove('loading-indicator');
            return response;
          }, function (error) {
            document.body.classList.remove('loading-indicator');
            return Promise.reject(error);
          });
        return TOKEN
    }
}

export default checkAuth