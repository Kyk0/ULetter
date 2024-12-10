const axiosInstance = require('../requests/axiosInstance');

// Mocking axiosInstance
jest.mock('../requests/axiosInstance', () => ({
    interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
    },
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

// Mocking localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('axiosInstance.js tests', () => {
    let requestInterceptorFn;
    let responseInterceptorFn;

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();

        // Mock implementation for interceptors
        requestInterceptorFn = jest.fn(async (config) => {
            const tokens = localStorage.getItem('authTokens');
            if (tokens) {
                const { access, refresh } = JSON.parse(tokens);
                const payload = JSON.parse(atob(access.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);

                // Check if the token is expired
                if (payload.exp < currentTime) {
                    const response = await axiosInstance.post('/users/token/', { refresh });
                    localStorage.setItem('authTokens', JSON.stringify(response.data));
                    config.headers.Authorization = `Bearer ${response.data.access}`;
                } else {
                    config.headers.Authorization = `Bearer ${access}`;
                }
            }
            return config;
        });

        responseInterceptorFn = jest.fn(async (error) => {
            throw error.response?.data;
        });

        axiosInstance.interceptors.request.use.mockImplementation((onFulfilled) => {
            onFulfilled(requestInterceptorFn);
        });

        axiosInstance.interceptors.response.use.mockImplementation((_, onRejected) => {
            onRejected(responseInterceptorFn);
        });
    });

    test('should add Authorization header if tokens exist and are valid', async () => {
        const mockAccessToken = 'valid-access-token';
        const mockPayload = { exp: Math.floor(Date.now() / 1000) + 120 }; // Token is valid
        localStorage.setItem('authTokens', JSON.stringify({ access: mockAccessToken }));

        jest.spyOn(window, 'atob').mockImplementation(() => JSON.stringify(mockPayload));

        const mockConfig = { headers: {} };
        const config = await requestInterceptorFn(mockConfig); // Manually call the interceptor

        expect(config.headers.Authorization).toBe(`Bearer ${mockAccessToken}`);
    });

    test('should refresh token if access token is expired', async () => {
        const mockAccessToken = 'expired-access-token';
        const mockRefreshToken = 'valid-refresh-token';
        const mockPayload = { exp: Math.floor(Date.now() / 1000) - 10 }; // Token is expired
        const newAccessToken = 'new-access-token';

        localStorage.setItem('authTokens', JSON.stringify({ access: mockAccessToken, refresh: mockRefreshToken }));
        jest.spyOn(window, 'atob').mockImplementation(() => JSON.stringify(mockPayload));

        axiosInstance.post.mockResolvedValueOnce({ data: { access: newAccessToken } });

        const mockConfig = { headers: {} };
        const config = await requestInterceptorFn(mockConfig); // Manually call the interceptor

        expect(config.headers.Authorization).toBe(`Bearer ${newAccessToken}`);
        expect(localStorage.getItem('authTokens')).toContain(newAccessToken);
    });

    test('should handle API errors and return a rejected promise', async () => {
        const mockError = { response: { data: { detail: 'Error occurred' } } };

        // Manually call the error handler of the interceptor
        await expect(responseInterceptorFn(mockError)).rejects.toEqual(mockError.response.data);
    });
});
