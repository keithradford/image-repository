import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mocked } from "ts-jest/utils";
import { useFirstVisit } from "../../hooks/useFirstVists";
import { MainContainer } from "../MainContainer";

jest.mock("../../hooks/useFirstVists.tsx");

const mockFirstVisit = mocked(useFirstVisit);

describe("MainContainer", () => {
  it("should render the WelcomeContainer on first visit", () => {
    mockFirstVisit.mockReturnValue({
      firstVisit: true,
      changeFirstVisit: jest.fn(),
    });

    render(<MainContainer />);
    expect(
      screen.getByText(
        "type in some topics you'd be interested in viewing and continue to the site to start browsing"
      )
    ).toBeInTheDocument();
  });

  it("should render the main page", () => {
    mockFirstVisit.mockReturnValue({
      firstVisit: false,
      changeFirstVisit: jest.fn(),
    });
    render(<MainContainer />);

    expect(screen.getByText("myPics")).toBeInTheDocument();
  });

  describe("tab buttons", () => {
    beforeEach(() => {
      mockFirstVisit.mockReturnValue({
        firstVisit: false,
        changeFirstVisit: jest.fn(),
      });
      render(<MainContainer />);
    });

    it("should render all three", () => {
      expect(screen.getByText("EXPLORE")).toBeInTheDocument();
      expect(screen.getByText("SEARCH")).toBeInTheDocument();
      expect(screen.getByText("VAULT")).toBeInTheDocument();
    });
  });

  describe("settings button", () => {
    it("should open a menu onClick", () => {
      mockFirstVisit.mockReturnValue({
        firstVisit: false,
        changeFirstVisit: jest.fn(),
      });
      render(<MainContainer />);

      const settingsButton = screen.getAllByRole("button")[0];
      userEvent.click(settingsButton);

      expect(screen.getByText("Edit Tags")).toBeInTheDocument();
    });
  });
});
