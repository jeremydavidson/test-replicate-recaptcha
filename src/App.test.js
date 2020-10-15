import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "./App";
import fetchMock from "fetch-mock";

fetchMock.mock('https://loremflickr.com/200/200/newyork,snow', { url: "#" });
fetchMock.mock('https://loremflickr.com/200/200/cat', { url: "#" });

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should display a heading", async () => {
    const component = await screen.findByText("Select all cats");
    expect(component).toBeInTheDocument();
  });

  it("should display 9 images", async () => {
      const images = await screen.findAllByRole("img");
      expect(images).toHaveLength(9);
  });

  it("should display ready to submit message", async () => {
      const images = await screen.findAllByAltText("cats");
      images.forEach(image => {
        fireEvent.click(image);
      });
      const message = await screen.findByText("You are ready to submit...");
      expect(message).toBeInTheDocument();
  });

  it("should display success message after submit", async () => {
      const images = await screen.findAllByAltText("cats");
      images.forEach(image => {
        fireEvent.click(image);
      });
      const button = await screen.findByText("Submit");
      fireEvent.click(button);
      const message = await screen.findByText("Thanks, you selected all cats");
      expect(message).toBeInTheDocument();
  });

});
