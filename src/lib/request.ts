import ApiException from "./exceptions/ApiException";

// const BASE_API_URL: string = (process.env.BASE_API_URL ?? "https://cineflex-api.onrender.com/api");
const BASE_API_URL: string = 'https://cineflex-api.onrender.com/api';

export const get = async <T>(
    url: string,
    headers: Headers = new Headers({})
): Promise<T> => {
    headers.append('Content-Type', 'application/json');

    const authToken = localStorage.getItem('auth');
    if (authToken && authToken.trim() !== '') {
        headers.append('Authorization', `Bearer ${authToken}`);
    }

    const response = await fetch(`${BASE_API_URL}/${url}`, {
        headers: headers,
        method: "GET",
    });

    if (!response.ok) {
        const error = await response.text();
        throw new ApiException(response.status, error);
    }

    return (response.json() ?? {}) as Promise<T>;
};

export const post = async <TRequest, TResponse>(
    url: string,
    body?: TRequest,
    headers: Headers= new Headers({})
): Promise<TResponse> => {
    headers.append('Content-Type', 'application/json');

    const authToken = localStorage.getItem('auth');
    if (authToken && authToken.trim() !== '') {
        headers.append('Authorization', `Bearer ${authToken}`);
    }

    const response = await fetch(`${BASE_API_URL}/${url}`, {
        method: "POST",
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    // If there's no content, return an empty object
    if (response.status === 204) return {} as TResponse;

    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
        const error = await response.text();
        throw new ApiException(response.status, error);
    }

    if (contentType?.includes("application/json")) {
        return (await response.json()) as TResponse;
    } else if (contentType?.includes("text/")) {
        return (await response.text()) as TResponse;
    } else if (contentType?.includes("application/octet-stream") || contentType?.includes("blob")) {
        return (await response.blob()) as TResponse;
    } else {
        // fallback for unknown types
        return (await response.text()) as TResponse;
    }
};

export const put = async <TRequest, TResponse>(
    url: string,
    body?: TRequest,
    headers: Headers = new Headers({})
): Promise<TResponse> => {
    headers.append('Content-Type', 'application/json');

    const authToken = localStorage.getItem('auth');
    if (authToken && authToken.trim() !== '') {
        headers.append('Authorization', `Bearer ${authToken}`);
    }


    const response = await fetch(`${BASE_API_URL}/${url}`, {
        method: "PUT",
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new ApiException(response.status, error);
    }

    // If there's no content, return an empty object
    if (response.status === 204) return {} as TResponse;

    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
        const error = await response.text();
        throw new ApiException(response.status, error);
    }

    if (contentType?.includes("application/json")) {
        return (await response.json()) as TResponse;
    } else if (contentType?.includes("text/")) {
        return (await response.text()) as TResponse;
    } else if (contentType?.includes("application/octet-stream") || contentType?.includes("blob")) {
        return (await response.blob()) as TResponse;
    } else {
        // fallback for unknown types
        return (await response.text()) as TResponse;
    }
};

export const del = async <TResponse>(
    url: string,
    headers: Headers = new Headers({})
): Promise<TResponse> => {
    headers.append('Content-Type', 'application/json');

    const authToken = localStorage.getItem('auth');
    if (authToken && authToken.trim() !== '') {
        headers.append('Authorization', `Bearer ${authToken}`);
    }


    const response = await fetch(`${BASE_API_URL}/${url}`, {
        method: "DELETE",
        headers: headers
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "DELETE request failed");
    }

    // If there's no content, return an empty object
    if (response.status === 204) return {} as TResponse;

    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
        const error = await response.text();
        throw new ApiException(response.status, error);
    }

    if (contentType?.includes("application/json")) {
        return (await response.json()) as TResponse;
    } else if (contentType?.includes("text/")) {
        return (await response.text()) as TResponse;
    } else if (contentType?.includes("application/octet-stream") || contentType?.includes("blob")) {
        return (await response.blob()) as TResponse;
    } else {
        // fallback for unknown types
        return (await response.text()) as TResponse;
    }
};
