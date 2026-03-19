import { render, screen, fireEvent } from "@testing-library/react";
import { MarkdownPreview } from "../MarkdownPreview";
import { ThemeProvider } from "../../contexts/ThemeContext";

jest.mock("../../utils/markdownUtils", () => ({
  generateWordHtml: jest.fn().mockImplementation((text) => text),
}));

describe("MarkdownPreview", () => {
  const markdown = "# Test Heading";

  beforeAll(() => {
    (global as unknown as { ClipboardItem?: unknown }).ClipboardItem = class ClipboardItem {
      constructor(public items: Record<string, Blob>) {}
    };
  });

  beforeEach(() => {
    const mockClipboard = {
      writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      write: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    Object.assign(navigator, {
      clipboard: mockClipboard,
    });

    // Mock window.getSelection
    const mockRange = {
      selectNodeContents: jest.fn(),
    };
    const mockSelection = {
      removeAllRanges: jest.fn(),
      addRange: jest.fn(),
    };
    document.createRange = jest.fn(() => mockRange as unknown as Range);
    window.getSelection = jest.fn(() => mockSelection as unknown as Selection);

  });

  afterEach(() => {
    jest.clearAllMocks();
    // Clean up any appended containers
    const container = document.querySelector('div[style*="left: -9999px"]');
    if (container) {
      container.remove();
    }
  });

  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  it("handles copy button click", async () => {
    renderWithTheme(<MarkdownPreview markdown={markdown} />);

    const copyButton = screen.getByRole("button", { name: /copy formatted html/i });
    fireEvent.click(copyButton);

    // Look for the success message text directly
    const successMessage = await screen.findByText(/copied/i);
    expect(successMessage).toBeInTheDocument();
  });
});
