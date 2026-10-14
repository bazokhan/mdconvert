import { render } from "@testing-library/react";
import { MarkdownPreview } from "../MarkdownPreview";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { ToastProvider } from "../Toast";

jest.mock("../../utils/markdownUtils", () => ({
  generateWordHtml: jest.fn().mockImplementation((text) => text),
  copyMarkdown: jest.fn().mockResolvedValue(undefined),
  copyFormatted: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("../../contexts/LanguageContext", () => ({
  useLanguage: () => ({ language: "en", setLanguage: jest.fn() }),
}));

describe("MarkdownPreview", () => {
  const markdown = "# Test Heading";

  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <ThemeProvider>
        <ToastProvider>{component}</ToastProvider>
      </ThemeProvider>
    );
  };

  it("renders the rendered markdown", () => {
    const { container } = renderWithProviders(<MarkdownPreview markdown={markdown} />);
    expect(container.textContent).toContain("Test Heading");
  });

  it("renders the empty state when no markdown", () => {
    const { container } = renderWithProviders(<MarkdownPreview markdown="" />);
    expect(container.textContent).toBeTruthy();
  });
});