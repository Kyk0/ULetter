const axiosMock = {
    create: jest.fn(() => axiosMock),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
};

module.exports = axiosMock;
