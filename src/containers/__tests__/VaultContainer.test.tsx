import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { InteractivePhoto } from "../../components/Photo";
import { useSavedPhotos } from "../../hooks/useSavedPhotos";
import { VaultContainer } from "../VaultContainer";

jest.mock("../../hooks/useSavedPhotos.tsx");
jest.mock("../../components/Photo.tsx");

const mockUseSavedPhotos = mocked(useSavedPhotos);
const mockInteractivePhoto = mocked(InteractivePhoto);

const noSavedPhotos: any = {
  photos: [],
};

const savedPhotos: any = {
  photos: [1, 2, 3, 4, 5],
};

describe("VaultContainer", () => {
  beforeEach(() => {
    mockInteractivePhoto.mockImplementation(() => (
      <div data-testid="photo">photo</div>
    ));
  });

  describe("when no images are saved", () => {
    beforeEach(() => {
      mockUseSavedPhotos.mockReturnValue(noSavedPhotos);
    });

    it("should show the 'empty' message", () => {
      render(<VaultContainer />);

      expect(screen.getByText(/.*nothing here!.*/)).toBeInTheDocument();
    });
  });

  describe("when images are saved", () => {
    beforeEach(() => {
      mockUseSavedPhotos.mockReturnValue(savedPhotos);
    });

    it("should render all images", () => {
      render(<VaultContainer />);

      expect(screen.getAllByTestId("photo")).toHaveLength(5);
    });
  });
});
