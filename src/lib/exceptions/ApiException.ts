class ApiException extends Error{
    status: number = 500;

    constructor(status?: number, message?: string) {
        super(message);
        this.status = status || 500;
    }
}

export default ApiException;