import { render, screen } from "@testing-library/react";
import { SimpleTable } from "./simpleTable";
import userEvent from "@testing-library/user-event";

describe("SimpleTable", () => {
  it("renders title and description on table", () => {
    render(
      <SimpleTable
        title="Test Title"
        description="Test Description"
        data={[]}
      />,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders correct ammount of rows and headers", () => {
    render(
      <SimpleTable
        title="Test Title"
        description="Test Description"
        data={[
          { id: 1, name: "Test Name" },
          { id: 2, name: "Test Name 2" },
        ]}
      />,
    );

    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();

    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(2);

    const columnRows = screen.getAllByRole("row");
    expect(columnRows).toHaveLength(3);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Test Name")).toBeInTheDocument();
  });

  it("header action click works", async () => {
    const handleClick = vi.fn();

    render(
      <SimpleTable
        title="Test Title"
        description="Test Description"
        data={[]}
        headerActions={<button onClick={handleClick}>Add Song</button>}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Add Song" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders edit item and handles click", async () => {
    const editItemOnClick = vi.fn();

    render(
      <SimpleTable
        title="Test Title"
        description="Test Description"
        data={[
          { id: 1, name: "Test Name" },
          { id: 2, name: "Test Name 2" },
        ]}
        editItemOnClick={editItemOnClick}
      />,
    );

    await userEvent.click(screen.getAllByText("Edit")[0]);

    expect(editItemOnClick).toHaveBeenCalledTimes(1);
    expect(editItemOnClick).toHaveBeenCalledWith({ id: 1, name: "Test Name" });
  });

  it("renders delete item and handles click", async () => {
    const deleteItemOnClick = vi.fn();

    render(
      <SimpleTable
        title="Test Title"
        description="Test Description"
        data={[
          { id: 1, name: "Test Name" },
          { id: 2, name: "Test Name 2" },
        ]}
        deleteItemOnClick={deleteItemOnClick}
      />,
    );

    await userEvent.click(screen.getAllByText("Delete")[0]);

    expect(deleteItemOnClick).toHaveBeenCalledTimes(1);
    expect(deleteItemOnClick).toHaveBeenCalledWith({
      id: 1,
      name: "Test Name",
    });
  });
});
