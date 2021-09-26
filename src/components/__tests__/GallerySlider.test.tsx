import { render, screen } from "@testing-library/react";
import { GallerySlider } from "../GallerySlider";
import { mocked } from "ts-jest/utils";
import { InteractivePhoto } from "../Photo";

jest.mock("../Photo.tsx");

const mockInteractivePhoto = mocked(InteractivePhoto);

const photos: any[] = [1, 2, 3, 4, 5, 6, 7, 8];

describe("GallerySlider", () => {
  beforeEach(() => {
    mockInteractivePhoto.mockImplementation(() => (
      <div data-testid="image">this is my mocked image</div>
    ));
  });
  it("should render 'infinity' photos", () => {
    render(<GallerySlider photos={photos} />);
    expect(screen.getAllByTestId("image")).toHaveLength(24);
  });
});
