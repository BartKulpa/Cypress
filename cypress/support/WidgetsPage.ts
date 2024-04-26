export default class WidgetsPage {
  elementHover(elementType: string, expectedText: string) {
    cy.get(`[id='toolTip${elementType}']`).as('element')
      .trigger("mouseover")
      .then(() => {
        cy.get(`[role='tooltip']`).should(
          "have.text",
          expectedText
        );
        cy.get('@element').trigger('mouseout');
      });
  }

  linkHover(linkText: string) {
    cy.contains(linkText).as('element')
      .trigger("mouseover")
      .then(() => {
        cy.get(`[role='tooltip']`).should(
          "have.text",
          `You hovered over the ${linkText}`
        );
        cy.get('@element').trigger('mouseout');
      });
  }

}
