import { render, screen } from "@testing-library/react";
import { FileUpload } from "../FileUpload";
import { DropzoneOptions } from "react-dropzone";

const mockUseDropzone = jest.fn();
jest.mock("react-dropzone", () => ({
  useDropzone: (options: DropzoneOptions) => {
    mockUseDropzone(options);
    return {
      getRootProps: () => ({}),
      getInputProps: () => ({}),
      isDragActive: false,
    };
  },
}));

describe("FileUpload", () => {
  const mockOnFileContent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders upload button", () => {
    render(<FileUpload onFileContent={mockOnFileContent} />);
    expect(
      screen.getByRole("button", { name: /upload or drag & drop markdown/i })
    ).toBeInTheDocument();
  });

  it("handles file upload", () => {
    const file = new File(["# Test Content"], "test.md", {
      type: "text/markdown",
    });

    const mockReadAsText = jest.fn();
    const mockFileReader = {
      readAsText: mockReadAsText,
      onload: null,
      result: "# Test Content",
    } as unknown as FileReader;

    jest.spyOn(window, "FileReader").mockImplementation(() => mockFileReader);

    render(<FileUpload onFileContent={mockOnFileContent} />);

    const onDrop = mockUseDropzone.mock.calls[0][0].onDrop;
    onDrop([file]);

    if (mockFileReader.onload) {
      mockFileReader.onload({
        target: mockFileReader,
      } as unknown as ProgressEvent<FileReader>);
    }

    expect(mockReadAsText).toHaveBeenCalledWith(file);
    expect(mockOnFileContent).toHaveBeenCalledWith("# Test Content");
  });
});
