import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PrimaryButton } from "./primaryButton";

describe("PrimaryButton", () => {
  it("renders the title", () => {
    render(<PrimaryButton title="Add Song" />);

    expect(screen.getByText("Add Song")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<PrimaryButton title="Add Song" onClick={handleClick} />);

    await userEvent.click(screen.getByText("Add Song"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not throw when onClick is not provided", async () => {
    render(<PrimaryButton title="Add Song" />);

    await userEvent.click(screen.getByText("Add Song"));
  });
});
