describe("Test", () => {
  const url = "http://localhost:3000/";
  it("Test", () => {
    cy.visit(url);
    cy.get(".but-Login").click();
    cy.url().should("eq", url + "auth");
    cy.get("#pseudo").type("test").should("have.value", "test");
    cy.get("#password").type("test").should("have.value", "test");
    cy.get(".auth-5-but1").click();
    cy.url().should("eq", url);
    cy.intercept({
      method: "GET",
      url: "/api/trade/usdt/eur/1",
    }).as("tradeCheck");
    cy.get("#CoinPrice-usdt #quantite").type("1").should("have.value", "1");
    cy.get("#CoinPrice-usdt .buy").click();
  });
});
