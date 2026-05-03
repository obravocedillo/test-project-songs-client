import { screen } from "@testing-library/react";
import { renderWithStore } from "../../test/utils";
import { Songs } from "./songs";

describe("Songs page", () => {
  it("renders songs from API", async () => {
    renderWithStore(<Songs />);

    expect(await screen.findByText("Bohemian Rhapsody")).toBeInTheDocument();
    expect(await screen.findByText("Hotel California")).toBeInTheDocument();
  });
});
