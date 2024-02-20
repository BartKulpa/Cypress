export default class Modals {

    assertModalContent(modalType: string, content: string){
        cy.get(`[id="show${modalType}Modal"]`).click();
		cy.get("[class='modal-body']").should('have.text', content);
		cy.get(`[id="close${modalType}Modal"]`).click();
    }

}