describe("Test Login", () => {
  it("Test Login", () => {
    cy.visit("https://cryptosim.vercel.app/");
    cy.get(".but-Login").click();
    cy.url().should("include", "/auth");
    cy.get("#pseudo").type("ben").should("have.value", "ben");
    cy.get("#password").type("test").should("have.value", "test");
  });
});
