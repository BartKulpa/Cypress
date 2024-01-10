/// <reference types="cypress-xpath" />
import TextFields from "../support/TextFields";

describe("QA workshop", () => {
	it("First test", () => {
		cy.visit("https://demoqa.com/");
		cy.contains("Elements").click();
		cy.contains("Text Box").click();

		TextFields.fillOutTextInput("userName", "mrydel");
		TextFields.fillOutTextInput("userEmail", "mrydel@g9.com");
		TextFields.fillOutTextArea("currentAddress", "Some value");
		TextFields.fillOutTextArea("permanentAddress", "Some value 2");
		cy.contains("Submit").click();

		TextFields.assertHaveValue("name", "Name:mrydel");
		TextFields.assertHaveValue("email", "Email:mrydel@g9.com");
		TextFields.assertContainsValue("currentAddress", "value");
		TextFields.assertContainsValue("permanentAddress", "Some");
	});

	it('Second test', () => {
		cy.visit("https://demoqa.com/checkbox");
		cy.get("button[title='Toggle']").click();
		cy.contains("Desktop").parents("span").find("button").click();
		cy.get("[id='tree-node-notes']").click({force: true});
		cy.get("[id='result']").should('have.text', 'You have selected :notes');
	
	  })

	  it('Radio buttons test', () => {
		cy.visit("https://demoqa.com/radio-button");
		cy.get("input[id='yesRadio']").click({force: true});
		cy.get("span[class='text-success']").should('have.text', 'Yes').should('be.visible');
		cy.get("label[for='impressiveRadio']").click();
		cy.get("span[class='text-success']").should('have.text', 'Impressive').should('be.visible');
		cy.get("input[id='noRadio']").should('be.disabled');
	  })

	  it('Buttons test', () => {
		cy.visit("https://demoqa.com/buttons");
		cy.get("button[id='doubleClickBtn']").dblclick();
		cy.get("p[id='doubleClickMessage']").should('be.visible').should('have.text', 'You have done a double click');
		cy.get("button[id='rightClickBtn']").rightclick();
		cy.get("p[id='rightClickMessage']").should('be.visible').should('have.text', 'You have done a right click');
		cy.xpath("//button[text()='Click Me']").click().should('have.text', 'Click Me').click();
		cy.get("p[id='dynamicClickMessage']").should('be.visible').should('have.text', 'You have done a dynamic click');
	  })

	  it('Links test', () => {
		cy.visit("https://demoqa.com/links");
		cy.intercept("GET","https://demoqa.com/created").as("CreateRequest");
		cy.contains("Created").click();
		cy.wait('@CreateRequest');
		cy.get("[id=linkResponse]").should('have.text', 'Link has responded with staus 201 and status text Created');
		cy.intercept("GET","https://demoqa.com/bad-request",{statusCode:400}).as("BadRequest");
		cy.contains("Bad Request").click();
		cy.wait('@BadRequest');
		cy.get("[id=linkResponse]").should('have.text', 'Link has responded with staus 400 and status text Bad Request');
	  })

	  it.only('Forms test', () => {
		cy.viewport(1280,1200);
		cy.visit("https://demoqa.com/automation-practice-form");
		cy.get("[id='firstName']").type("John");
		cy.get("[id='lastName']").type("Doe");
		cy.get("[id='userEmail']").type("x.test@test.com");
		cy.get("input[value='Male']").check({force:true});
		// cy.get("input[value='Male']").click({force:true});
		cy.get("[id='userNumber']").type("1111111111").blur();
		cy.get("[id='dateOfBirthInput']").click();
		cy.contains("button", "Next Month").click();
		cy.get("div[class*='current-month']").should('have.text', 'January 2024');
		cy.get("div[class^='react-datepicker__day']").contains('15').click();
		cy.get("[id='subjectsInput']").type("English{Enter}");
		cy.get("[id='subjectsInput']").type("M").then(()=>{
			cy.get("[id*='react-select-2-option']").contains('Chemistry').click();
		});
		cy.contains("label","Sports").siblings("input").check({force:true});
		cy.get("[id='uploadPicture']").selectFile("cypress/fixtures/mobile.jpg");
		cy.get("[id='currentAddress']").type("ul. Pawia 9");
		cy.contains("Select State").click({force:true}).then(()=>{
			cy.get("[id*='react-select-3-option']").contains("Haryana").click();
		});
		cy.contains("Select City").click({force:true}).then(()=>{
			cy.contains("Panipat").click();
		});
		cy.get("[id='submit']").click();

		cy.get("[id='example-modal-sizes-title-lg']").should('have.text', 'Thanks for submitting the form');
		const parameterNames = ['Student Name','Student Email','Gender','Mobile','Date of Birth','Subjects','Hobbies','Picture','Address','State and City'];
		const valueNames = ['John Doe','x.test@test.com','Male','1111111111','15 January,2024','English, Chemistry','Sports','mobile.jpg','ul. Pawia 9','Haryana Panipat'];

		for (let i=0; i<parameterNames.length; i++){
			cy.get('tr').eq(i+1).find('td').eq(0).should('have.text', parameterNames[i]);
			cy.get('tr').eq(i+1).find('td').eq(1).should('have.text', valueNames[i]);
		}

		cy.get("[id='closeLargeModal']").click();
	  })
});
