import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { GallerySlider } from "../../components/GallerySlider";
import { usePhotos } from "../../hooks/usePhotos";
import { BrowseContainer } from "../BrowseContainer";

jest.mock("../../hooks/usePhotos.tsx");
jest.mock("../../components/GallerySlider.tsx");

const mockUsePhotos = mocked(usePhotos);
const mockGallerySlider = mocked(GallerySlider);

describe("BrowseContainer", () => {
  describe("when the API call is loading", () => {
    beforeEach(() => {
      mockUsePhotos.mockReturnValue({ status: "loading" });
      render(<BrowseContainer query="cats" />);
    });

    it("should render the query as a heading", () => {
      expect(screen.getByText("CATS")).toBeInTheDocument();
    });

    it("should render the spinner", () => {
      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });
  });

  describe("when the API call is loaded", () => {
    beforeEach(() => {
      mockUsePhotos.mockReturnValue({
        status: "loaded",
        data: ["my cool photo"] as any[],
      });
      mockGallerySlider.mockImplementation(({ photos }) => (
        <div data-testid="gallery">{photos[0]}</div>
      ));
      render(<BrowseContainer query="cats" />);
    });

    it("should render the query as a heading", () => {
      expect(screen.getByText("CATS")).toBeInTheDocument();
    });

    it("should render the GallerySlider", () => {
      expect(screen.getByTestId("gallery")).toBeInTheDocument();
      expect(screen.getByText("my cool photo")).toBeInTheDocument();
    });
  });
});
