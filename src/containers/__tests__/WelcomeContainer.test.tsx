import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mocked } from "ts-jest/utils";
import { Tag } from "../../components/Tag";
import { useSavedTags } from "../../hooks/useSavedTags";
import { WelcomeContainer } from "../WelcomeContainer";

jest.mock("../../hooks/useSavedTags.tsx");
jest.mock("../../components/Tag.tsx");

const mockTag = mocked(Tag);
const mockUseSavedTags = mocked(useSavedTags);
const mockContains = jest.fn();
const mockAddTag = jest.fn();
const mockDeleteTag = jest.fn();

describe("WelcomeContainer", () => {
  describe("input", () => {
    beforeEach(() => {
      mockUseSavedTags.mockReturnValue({
        tags: [],
        addTag: mockAddTag,
        deleteTag: jest.fn(),
        contains: mockContains,
        clearTags: jest.fn(),
      });
    });

    it("should add the tag on button press", () => {
      render(<WelcomeContainer />);

      const input = screen.getByRole("textbox");
      userEvent.type(input, "my new tag");
      const addButton = screen.getByRole("button");

      userEvent.click(addButton);
      expect(mockAddTag).toHaveBeenCalledWith("my new tag");
    });

    it("should add the tag on enter keypress", () => {
      render(<WelcomeContainer />);

      const input = screen.getByRole("textbox");
      userEvent.type(input, "my new tag{enter}");

      expect(mockAddTag).toHaveBeenCalledWith("my new tag");
    });

    it("should change when user types", () => {
      render(<WelcomeContainer />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");

      userEvent.type(input, "my new tag");
      expect(input).toHaveValue("my new tag");
    });
  });

  describe("tags", () => {
    beforeEach(() => {
      mockUseSavedTags.mockReturnValue({
        tags: ["these", "cool", "tags"],
        addTag: mockAddTag,
        deleteTag: mockDeleteTag,
        contains: mockContains,
        clearTags: jest.fn(),
      });
      mockTag.mockImplementation(({ handleDelete, tag }) => (
        <button data-testid="tag" onClick={() => handleDelete(tag)}>
          {tag}
        </button>
      ));
    });

    it("should render existing tags", () => {
      render(<WelcomeContainer />);

      expect(screen.getAllByTestId("tag")).toHaveLength(3);
    });

    it("should remove the tag onClick", () => {
      render(<WelcomeContainer />);

      const tag = screen.getByText("cool") as HTMLButtonElement;
      userEvent.click(tag);

      expect(mockDeleteTag).toBeCalledWith("cool");
    });
  });
});
