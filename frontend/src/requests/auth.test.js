const { loginUserAPI, registerUserAPI, logoutUserAPI } = require('./auth');

// Mocking axiosInstance
jest.mock('./axiosInstance', () => ({
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
}));

const axiosInstance = require('./axiosInstance');

// Mock for localStorage
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

describe('auth.js API tests with axiosInstance', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
        localStorage.clear(); 
    });

    test('loginUserAPI should call the correct API endpoint with credentials', async () => {
        const credentials = { email: 'test@example.com', password: 'password123' };
        const mockResponse = { data: { access: 'test-access-token' } };

        axiosInstance.post.mockResolvedValueOnce(mockResponse);

        const result = await loginUserAPI(credentials);

        expect(axiosInstance.post).toHaveBeenCalledWith('/users/login/', credentials, {
            headers: { Authorization: undefined },
        });
        expect(result).toEqual(mockResponse.data);
    });

    test('registerUserAPI should call the correct API endpoint with user data', async () => {
        const userData = { email: 'test@example.com', password: 'password123' };
        const mockResponse = { data: { access: 'test-access-token' } };

        axiosInstance.post.mockResolvedValueOnce(mockResponse);

        const result = await registerUserAPI(userData);

        expect(axiosInstance.post).toHaveBeenCalledWith('/users/signup/', userData, {
            headers: { Authorization: undefined },
        });
        expect(result).toEqual(mockResponse.data);
    });

    test('logoutUserAPI should call the correct API endpoint with refresh token', async () => {
        const refreshToken = 'test-refresh-token';
        const mockResponse = { data: 'Logged out successfully' };

        axiosInstance.post.mockResolvedValueOnce(mockResponse);

        const result = await logoutUserAPI(refreshToken);

        expect(axiosInstance.post).toHaveBeenCalledWith('/users/logout/', { refresh_token: refreshToken });
        expect(result).toEqual(mockResponse.data);
    });
});
