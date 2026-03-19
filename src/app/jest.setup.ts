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
  Editor: jest.fn(() => null),
}));

// Mock marked for consistent behavior
const markedFn = jest.fn((text: string) => text);
Object.assign(markedFn, { parse: markedFn });
jest.mock("marked", () => ({
  marked: markedFn,
  parse: markedFn,
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
