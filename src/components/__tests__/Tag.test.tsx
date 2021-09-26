import { useColorMode } from "@chakra-ui/color-mode";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mocked } from "ts-jest/utils";
import { Tag } from "../Tag";

jest.mock("@chakra-ui/color-mode");

const mockUseColorMode = mocked(useColorMode);
const handleDelete = jest.fn();

describe("Tag", () => {
  beforeEach(() => {
    mockUseColorMode.mockReturnValue({
      colorMode: "dark",
      toggleColorMode: jest.fn(),
      setColorMode: jest.fn(),
    });
    render(<Tag tag="hello" handleDelete={handleDelete} />);
  });

  it("should have the correct text content", () => {
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("should have the correct color", () => {
    expect(screen.getByText("hello")).toHaveStyle(
      "background-color: var(--chakra-colors-gray-700)"
    );
  });

  it("should call onDelete when clicking close button", () => {
    const closeButton = screen.getByRole("button");
    userEvent.click(closeButton);
    expect(handleDelete).toBeCalledWith("hello");
  });
});
