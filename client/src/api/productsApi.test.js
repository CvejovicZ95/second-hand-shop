import config from "../config.json";
import {
  getProductById,
  getProducts,
  getProductsByAuthor,
  deleteProduct,
  updateProduct,
  //uploadAd,
} from "../api/productsApi";

const apiUrl = config.API_BASE_URL;

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

describe("Product API", () => {
  it("calls correct endpoint to fetch product by ID", async () => {
    const mockProductId = "123";
    const mockResponse = { name: "Test Product" };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const product = await getProductById(mockProductId);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${apiUrl}/api/ads/${mockProductId}`,
    );

    expect(product).toEqual(mockResponse);
  });

  it("calls correct endpoint to fetch all products", async () => {
    const mockResponse = [{ name: "Product 1" }, { name: "Product 2" }];

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const products = await getProducts();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${apiUrl}/api/ads`);

    expect(products).toEqual(mockResponse);
  });

  it("calls correct endpoint to fetch products by author ID", async () => {
    const mockAuthorId = "456";
    const mockResponse = [{ name: "Product 1" }, { name: "Product 2" }];

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const products = await getProductsByAuthor(mockAuthorId);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${apiUrl}/api/ads/author/${mockAuthorId}`,
    );

    expect(products).toEqual(mockResponse);
  });

  it("calls correct endpoint to delete product", async () => {
    const mockProductId = "123";

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
      }),
    );

    await deleteProduct(mockProductId);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${apiUrl}/api/ads/delete/${mockProductId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleted: true }),
      },
    );
  });

  it("calls correct endpoint to update product", async () => {
    const mockProductId = "123";
    const updatedName = "Updated Product";
    const updatedAbout = "Updated description";
    const updatedPrice = 99.99;

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
      }),
    );

    await updateProduct(mockProductId, updatedName, updatedAbout, updatedPrice);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${apiUrl}/api/ads/update/${mockProductId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedName,
          about: updatedAbout,
          price: updatedPrice,
        }),
      },
    );
  });

  /*it("uploads ad data to the server", async () => {
    const mockAdData = {
      name: "Test Product",
      about: "This is a test product.",
      price: "100",
      authorId: "123",
      image: "mockImage",
    };
    const mockResponse = { success: true };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const uploadResult = await uploadAd(mockAdData);

    const formData = new FormData();
    formData.append("name", mockAdData.name);
    formData.append("about", mockAdData.about);
    formData.append("price", mockAdData.price);
    formData.append("authorId", mockAdData.authorId);
    formData.append("image", mockAdData.image);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${apiUrl}/api/ads`, {
      method: "POST",
      body: formData,
    });

    expect(uploadResult).toEqual(true);
  });*/
});
