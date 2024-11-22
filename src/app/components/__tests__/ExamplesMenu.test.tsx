import { render, screen, fireEvent } from "@testing-library/react";
import { ExamplesMenu } from "../ExamplesMenu";
import { markdownExamples } from "../../utils/markdownExamples";

describe("ExamplesMenu", () => {
  const mockOnSelectExample = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders examples button", () => {
    render(<ExamplesMenu onSelectExample={mockOnSelectExample} />);
    expect(screen.getByText(/Examples/i)).toBeInTheDocument();
  });

  it("shows examples when clicked", () => {
    render(<ExamplesMenu onSelectExample={mockOnSelectExample} />);

    fireEvent.click(screen.getByText(/Examples/i));

    markdownExamples.forEach((example) => {
      expect(screen.getByText(example.title)).toBeInTheDocument();
    });
  });

  it("calls onSelectExample when example is selected", () => {
    render(<ExamplesMenu onSelectExample={mockOnSelectExample} />);

    fireEvent.click(screen.getByText(/Examples/i));
    fireEvent.click(screen.getByText(markdownExamples[0].title));

    expect(mockOnSelectExample).toHaveBeenCalledWith(
      markdownExamples[0].markdown
    );
  });
});
