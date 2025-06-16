// const BASE_API_URL: string = (process.env.BASE_API_URL ?? "https://cineflex-api.onrender.com/api");
const BASE_API_URL: string = 'https://cineflex-api.onrender.com/api';

export const get = async <T>(
    url: string,
    config: RequestInit = {}
): Promise<T> => {
    const response = await fetch(`${BASE_API_URL}/${url}`, {
        ...config,
        method: "GET",
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "GET request failed");
    }

    return (response.json() ?? {}) as Promise<T>;
};

export const post = async <TRequest, TResponse>(
    url: string,
    body?: TRequest,
    config: RequestInit = {}
): Promise<TResponse> => {
    const response = await fetch(`${BASE_API_URL}/${url}`, {
        ...config,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(config.headers || {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    // If there's no content, return an empty object
    if (response.status === 204) return {} as TResponse;

    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "POST request failed");
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
    config: RequestInit = {}
): Promise<TResponse> => {
    const response = await fetch(`${BASE_API_URL}/${url}`, {
        ...config,
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(config.headers || {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "PUT request failed");
    }

    return (response.json() ?? {}) as Promise<TResponse>;
};

export const del = async <TResponse>(
    url: string,
    config: RequestInit = {}
): Promise<TResponse> => {
    const response = await fetch(`${BASE_API_URL}/${url}`, {
        ...config,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(config.headers || {}),
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "DELETE request failed");
    }

    return (response.json() ?? {} as TResponse);
};
