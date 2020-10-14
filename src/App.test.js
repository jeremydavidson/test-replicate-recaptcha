import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should display a heading", async () => {
    const component = await screen.findByText("Hello");
    expect(component).toBeInTheDocument();
  });
});
