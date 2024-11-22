import "@testing-library/jest-dom";

// Mock ResizeObserver which is needed for Monaco Editor
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock Monaco Editor
jest.mock("@monaco-editor/react", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

// Mock marked for consistent behavior
jest.mock("marked", () => ({
  marked: jest.fn((text) => text),
  lexer: jest.fn(() => []),
}));

// Add this mock before the tests
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});
