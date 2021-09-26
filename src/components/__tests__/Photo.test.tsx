import { render, screen } from "@testing-library/react";
import { Photo } from "../../lib/types";
import { InteractivePhoto } from "../Photo";
import userEvent from "@testing-library/user-event";

const photo: Photo = {
  urls: {
    small: "small",
    large: "large",
    regular: "regular",
    raw: "raw",
  },
  id: 1,
  width: 2,
  height: 3,
  color: "black",
  user: { username: "keithradford", name: "keith" },
};

describe("InteractivePhoto", () => {
  beforeEach(() => {
    render(<InteractivePhoto photo={photo} />);
  });

  it("should render the small image url", () => {
    expect(screen.getByRole("img")).toHaveAttribute("src", "small");
  });

  describe("modal", () => {
    beforeEach(() => {
      const image = screen.getAllByRole("img");
      userEvent.click(image[0]);
    });

    it("should open when clicking the image", () => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    it("should render the regular image", () => {
      expect(screen.getAllByRole("img")[1]).toHaveAttribute("src", "regular");
    });
  });
});
