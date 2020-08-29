import axios from 'axios';

class Request {
    static methods = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
    };

    static make = async (url, payload, method) => {
        const config = {url, method};

        switch (method) {
            case Request.methods.GET:
            case Request.methods.DELETE:
                config.params = payload;
                break;
            case Request.methods.POST:
            case Request.methods.PUT:
            case Request.methods.PATCH:
                config.data = payload;
                break;
            default:
                throw new Error('Passed invalid method');
        }

        const response = await axios.request(config);
        return response.data;
    };
}

export default Request;
