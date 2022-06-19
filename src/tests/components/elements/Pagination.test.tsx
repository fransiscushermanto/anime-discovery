import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../../components/elements/Pagination";

const MockPagination = ({ currentPage = 1, onPageChange = () => {} }) => (
  <Pagination
    currentPage={currentPage}
    totalPages={10}
    onPageChange={onPageChange}
    shownPages={3}
  />
);

describe("Pagination", () => {
  it("should initially render pagination", () => {
    render(<MockPagination />);

    const activePage = screen.getByText("1");

    expect(activePage).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    expect(activePage).toHaveClass("active");
  });

  it("should not throw error when shownPages greater than or equal to 3", () => {
    expect(() => render(<MockPagination />)).not.toThrow(
      "shownPages must be greater than 3",
    );
  });

  it("should add one number when currenPage is equal to shownPages", () => {
    render(<MockPagination currentPage={3} />);

    const currentPage = screen.getByText("3");

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(currentPage).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    expect(currentPage).toHaveClass("active");
  });

  it("should show two seperator and number between currenPage if currenPage greater than shownPages", () => {
    render(<MockPagination currentPage={4} />);

    const currentPage = screen.getByText("4");

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(currentPage).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getAllByText("...").length).toBe(2);
    expect(screen.getByText("10")).toBeInTheDocument();

    expect(currentPage).toHaveClass("active");
  });

  it("show add one previous number when currentPage step to totalPages equals to shownPages", () => {
    render(<MockPagination currentPage={8} />);

    const currentPage = screen.getByText("8");

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(currentPage).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    expect(currentPage).toHaveClass("active");
  });
});
