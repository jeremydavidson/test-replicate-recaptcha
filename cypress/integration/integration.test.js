describe("The app", () => {
  it("should display a heading", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Hello");
  });
});
