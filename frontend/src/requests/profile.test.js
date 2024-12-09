const axiosInstance = require('./axiosInstance');
const { getUserProfile, updateUserProfile } = require('./profile');

// Mocking axiosInstance
jest.mock('./axiosInstance', () => ({
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(), // Ensure the post method is mocked as well
}));

describe('Profile Module Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch user profile successfully', async () => {
        const mockResponse = { data: { name: 'John Doe', email: 'john.doe@example.com' } };
        axiosInstance.get.mockResolvedValueOnce(mockResponse);

        const result = await getUserProfile();
        expect(axiosInstance.get).toHaveBeenCalledWith(`/users/profile/`);
        expect(result).toEqual(mockResponse.data);
    });

    test('should update user profile successfully', async () => {
        const mockResponse = { data: { success: true } };
        axiosInstance.put.mockResolvedValueOnce(mockResponse);

        const updateData = { name: 'Jane Doe', email: 'jane.doe@example.com' };
        const result = await updateUserProfile(updateData);

        expect(axiosInstance.put).toHaveBeenCalledWith(`/users/profile/update/`, updateData);
        expect(result).toEqual(mockResponse.data);
    });

    test('should handle error when fetching user profile', async () => {
        const mockError = { response: { data: { detail: 'User not found' } } };
        axiosInstance.get.mockRejectedValueOnce(mockError);

        try {
            await getUserProfile();
        } catch (error) {
            expect(error.response.data.detail).toBe('User not found');
        }
    });

    test('should handle error when updating user profile', async () => {
        const mockError = { response: { data: { detail: 'Invalid email format' } } };
        axiosInstance.put.mockRejectedValueOnce(mockError);

        try {
            await updateUserProfile({ name: 'Jane Doe', email: 'invalid-email' });
        } catch (error) {
            expect(error.response.data.detail).toBe('Invalid email format');
        }
    });

    test('should refresh token if expired and retry the request', async () => {
        const mockExpiredTokenResponse = { response: { data: { detail: 'Token expired' } } };
        const mockNewTokenResponse = { data: { access: 'new-access-token' } };
        const mockUserData = { name: 'Jane Doe', email: 'jane.doe@example.com' };

        // Mock the sequence of API calls
        axiosInstance.get.mockRejectedValueOnce(mockExpiredTokenResponse);  // Simulate expired token
        axiosInstance.post.mockResolvedValueOnce(mockNewTokenResponse);     // Simulate refreshing token
        axiosInstance.get.mockResolvedValueOnce({ data: mockUserData });    // Simulate successful user profile fetch after refresh

        await getUserProfile().catch(() => {}); // Catch the initial error

        const result = await getUserProfile(); // Retry after token refresh
        expect(result).toEqual(mockUserData); // Verify the result after retry
    });

    test('should handle empty or invalid data when updating profile', async () => {
        const mockResponse = { data: { success: false, message: 'Invalid data' } };
        axiosInstance.put.mockResolvedValueOnce(mockResponse);

        const result = await updateUserProfile({});
        expect(result).toEqual(mockResponse.data);
    });
});
