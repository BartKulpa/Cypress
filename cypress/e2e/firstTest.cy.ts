/// <reference types="cypress-xpath" />
import TextFields from "../support/TextFields";
import Modals from "../support/modals";
import ElementsPage from "../support/ElementsPage";
import FormsPage from "../support/FormsPage";

const modals = new Modals();
const elementsPage = new ElementsPage();
const formsPage = new FormsPage();

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
		cy.visit("checkbox");
		elementsPage.clickToggleByValue("Home");
		elementsPage.clickToggleByValue("Desktop");
		elementsPage.clickCheckbox("Notes");
		elementsPage.assertResult("You have selected :notes");
	
	  })

	  it('Radio buttons test', () => {
		cy.visit("radio-button");
		elementsPage.clickRadiobutton("yes");
		elementsPage.assertTextSuccess("Yes");
		elementsPage.clickRadiobutton("impressive");
		elementsPage.assertTextSuccess("Impressive");
		elementsPage.assertRadiobuttonState("no","disabled");
	  })

	  it('Buttons test', () => {
		cy.visit("buttons");
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
<<<<<<< HEAD
		cy.visit("automation-practice-form");
		formsPage.fillInput("firstName","John");
		formsPage.fillInput("lastName","Doe");
		formsPage.fillInput("userEmail","x.test@test.com");
		formsPage.setGender("Male");
		formsPage.fillInput("userNumber","1111111111");
		formsPage.selectDateOfBirth('15 June 1990');
		formsPage.selectSubjectByTyping(['English','Math']);
		formsPage.selectSubjectByTypingAndSelecting(['Chemistry','Commerce']);
		// cy.get("[id='subjectsInput']").type("English{Enter}");
		// cy.get("[id='subjectsInput']").type("M").then(()=>{
		// 	cy.get("[id*='react-select-2-option']").contains('Chemistry').click();
		// });
		formsPage.setHobby(["Sports","Music"]);
		cy.get("[id='uploadPicture']").selectFile("cypress/fixtures/mobile.jpg");
		formsPage.fillInput("currentAddress","ul. Pawia 9");
=======
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
>>>>>>> c6112a7ce43231ac1d2736d1111e73a92e7d0772
		cy.contains("Select State").click({force:true}).then(()=>{
			cy.get("[id*='react-select-3-option']").contains("Haryana").click();
		});
		cy.contains("Select City").click({force:true}).then(()=>{
			cy.contains("Panipat").click();
		});
		cy.get("[id='submit']").click();

		cy.get("[id='example-modal-sizes-title-lg']").should('have.text', 'Thanks for submitting the form');
		const parameterNames = ['Student Name','Student Email','Gender','Mobile','Date of Birth','Subjects','Hobbies','Picture','Address','State and City'];
<<<<<<< HEAD
		const valueNames = ['John Doe','x.test@test.com','Male','1111111111','15 February, 2024','English, Chemistry','Sports','mobile.jpg','ul. Pawia 9','Haryana Panipat'];
=======
		const valueNames = ['John Doe','x.test@test.com','Male','1111111111','15 January,2024','English, Chemistry','Sports','mobile.jpg','ul. Pawia 9','Haryana Panipat'];
>>>>>>> c6112a7ce43231ac1d2736d1111e73a92e7d0772

		for (let i=0; i<parameterNames.length; i++){
			cy.get('tr').eq(i+1).find('td').eq(0).should('have.text', parameterNames[i]);
			cy.get('tr').eq(i+1).find('td').eq(1).should('have.text', valueNames[i]);
		}

		cy.get("[id='closeLargeModal']").click();
<<<<<<< HEAD
	  })

	  it('Modals test', () => {
		cy.visit("https://demoqa.com/modal-dialogs");
		modals.assertModalContent("Small", "This is a small modal. It has very less content");	
		modals.assertModalContent("Large", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");

=======
>>>>>>> c6112a7ce43231ac1d2736d1111e73a92e7d0772
	  })
});
