describe("The app", () => {

  it("should display a heading", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Select all dogs");
  });

  it("should display 9 images", () => {
    cy.visit("http://localhost:3000");
    cy.get("img").should("have.length", 9);
  });

  it("should display success after selecting all dogs", () => {
    cy.visit("http://localhost:3000");
    cy.get("[alt='dog']").click({ multiple: true });
    cy.wait(1000).contains('Submit').click();
    cy.contains("Thanks, you selected all dogs");
  });

  it("should display a message when evaluation isn't successful", () => {
    cy.visit("http://localhost:3000");
    cy.wait(1000).contains('Submit').click();
    cy.contains("You still have more");
  });

  it("should display message when you are ready to submit", () => {
    cy.visit("http://localhost:3000");
    cy.get("[alt='dog']").click({ multiple: true });
    cy.wait(1000).contains('You are ready to submit');
  });
});
