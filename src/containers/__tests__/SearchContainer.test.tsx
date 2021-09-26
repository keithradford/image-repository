import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mocked } from "ts-jest/utils";
import { InteractivePhoto } from "../../components/Photo";
import { usePhotos } from "../../hooks/usePhotos";
import { SearchContainer } from "../SearchContainer";

jest.mock("../../hooks/usePhotos.tsx");
jest.mock("../../components/Photo.tsx");

const mockUsePhotos = mocked(usePhotos);
const mockInteractivePhoto = mocked(InteractivePhoto);

describe("SearchContainer", () => {
  beforeEach(() => {
    mockInteractivePhoto.mockImplementation(() => (
      <div data-testid="photo">photo</div>
    ));
  });

  it("should render the spinner when loading", () => {
    mockUsePhotos.mockReturnValue({ status: "loading" });
    render(<SearchContainer />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  describe("when searching", () => {
    beforeEach(() => {
      mockUsePhotos.mockReturnValue({
        status: "loaded",
        data: ["cool photo"] as any[],
      });
    });

    it("should update the input value", () => {
      render(<SearchContainer />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");

      userEvent.type(input, "test");
      expect(input).toHaveValue("test");
    });

    it("should show the queried photos", () => {
      render(<SearchContainer />);

      expect(screen.getByTestId("photo")).toBeInTheDocument();
    });
  });
});
