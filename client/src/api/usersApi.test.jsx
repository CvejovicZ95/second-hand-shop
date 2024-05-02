import { loginUser, logoutUser, registerUser } from "../api/usersApi";

const mockFetch = jest.fn();

jest.mock("../config.json", () => ({
  API_BASE_URL: "http://example.com",
}));

describe("Authentication API", () => {
  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("loginUser", () => {
    it("calls the login endpoint with correct data", async () => {
      const mockUsername = "testuser";
      const mockPassword = "password";

      const mockResponse = { token: "testToken" };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await loginUser(mockUsername, mockPassword);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "http://example.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: mockUsername,
            password: mockPassword,
          }),
        },
      );

      expect(result).toEqual(mockResponse);
    });

    it("throws an error if login fails", async () => {
      const mockUsername = "testuser";
      const mockPassword = "password";

      const mockErrorResponse = { error: "Invalid username or password" };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockErrorResponse),
      });

      await expect(loginUser(mockUsername, mockPassword)).rejects.toThrow(
        "Incorrect username or password",
      );
    });
  });

  describe("logoutUser", () => {
    it("calls the logout endpoint", async () => {
      const mockResponse = { success: true };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      await logoutUser();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "http://example.com/api/auth/logout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );
    });

    it("throws an error if logout fails", async () => {
      const mockErrorResponse = { error: "Logout failed" };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockErrorResponse),
      });

      await expect(logoutUser()).rejects.toThrow("Logout failed");
    });
  });

  describe("registerUser", () => {
    it("calls the register endpoint with correct data", async () => {
      const mockUserData = {
        firstLastName: "Test User",
        username: "testuser",
        password: "password",
        confirmPassword: "password",
        email: "test@example.com",
        phoneNumber: "123456789",
      };

      const mockResponse = { success: true };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await registerUser(mockUserData);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "http://example.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mockUserData),
        },
      );

      expect(result).toEqual(mockResponse);
    });

    it("throws an error if registration fails", async () => {
      const mockUserData = {
        firstLastName: "Test User",
        username: "testuser",
        password: "password",
        confirmPassword: "password",
        email: "test@example.com",
        phoneNumber: "123456789",
      };

      const mockErrorResponse = { error: "Registration failed" };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockErrorResponse),
      });

      await expect(registerUser(mockUserData)).rejects.toThrow(
        "Registration failed",
      );
    });
  });
});
