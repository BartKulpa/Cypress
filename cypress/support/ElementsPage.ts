export default class ElementsPage {

    clickToggleByValue(value: string){
        cy.contains(value).parents("span").find("button").click();
    }

    clickCheckbox(value: string){
        cy.get(`[id='tree-node-${value.toLowerCase()}']`).click({force: true});
    }
    
    assertResult(expectedText: string){
        cy.get("[id='result']").should('have.text', expectedText);
    }

    clickRadiobutton(value: string){
        cy.get(`input[id='${value}Radio']`).click({force: true});
    }

    assertRadiobuttonState(value:string, state: string){
        cy.get(`input[id='${value}Radio']`).should(`be.${state}`)
    }

    assertTextSuccess(expectedText: string){
        cy.get("span[class='text-success']").should('have.text', expectedText).should('be.visible');
    }

    
}