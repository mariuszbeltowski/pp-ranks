import { render } from "@testing-library/react";
import Header from "../components/Header";

describe("Header", () => {
  it("should display Header content", () => {
    const { getByText } = render(<Header />);

    getByText("Table tenis ranking");
  });
});
