/**
 * Yes
 */

import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;

    /* yes */
    axios.defaults.baseURL = `http://localhost:8065/api/v1`;

    // Allow browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


    // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    /* metadata */
    async allArtists() {
        return axiosAgent.get(`metadata/db`)
            // .then(artists => artists.data)
            .then(artists => artists)
            .catch(error => (
                {
                    error,
                    artists: undefined,
                }
            ));
    }

}
