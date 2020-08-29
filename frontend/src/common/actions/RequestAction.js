class RequestAction {
    constructor(constants) {
        this.constants = constants;
    }

    request = (payload) => {
        return {
            type: this.constants.request,
            payload,
        }
    };
}

export default RequestAction;
