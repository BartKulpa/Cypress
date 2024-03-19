/// <reference types="cypress-xpath" />
import TextFields from "../support/TextFields";
import Modals from "../support/Modals";
import ElementsPage from "../support/ElementsPage";
import FormsPage from "../support/FormsPage";
import { student } from "../fixtures/userData";
import { all } from "cypress/types/bluebird";

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

  it("Second test", () => {
    cy.visit("checkbox");
    elementsPage.clickToggleByValue("Home");
    elementsPage.clickToggleByValue("Desktop");
    elementsPage.clickCheckbox("Notes");
    elementsPage.assertResult("You have selected :notes");
  });

  it("Radio buttons test", () => {
    cy.visit("radio-button");
    elementsPage.clickRadiobutton("yes");
    elementsPage.assertTextSuccess("Yes");
    elementsPage.clickRadiobutton("impressive");
    elementsPage.assertTextSuccess("Impressive");
    elementsPage.assertRadiobuttonState("no", "disabled");
  });

  it("Buttons test", () => {
    cy.visit("buttons");
    cy.get("button[id='doubleClickBtn']").dblclick();
    cy.get("p[id='doubleClickMessage']")
      .should("be.visible")
      .should("have.text", "You have done a double click");
    cy.get("button[id='rightClickBtn']").rightclick();
    cy.get("p[id='rightClickMessage']")
      .should("be.visible")
      .should("have.text", "You have done a right click");
    cy.xpath("//button[text()='Click Me']")
      .click()
      .should("have.text", "Click Me")
      .click();
    cy.get("p[id='dynamicClickMessage']")
      .should("be.visible")
      .should("have.text", "You have done a dynamic click");
  });

  it("Links test", () => {
    cy.visit("https://demoqa.com/links");
    cy.intercept("GET", "https://demoqa.com/created").as("CreateRequest");
    cy.contains("Created").click();
    cy.wait("@CreateRequest");
    cy.get("[id=linkResponse]").should(
      "have.text",
      "Link has responded with staus 201 and status text Created"
    );
    cy.intercept("GET", "https://demoqa.com/bad-request", {
      statusCode: 400,
    }).as("BadRequest");
    cy.contains("Bad Request").click();
    cy.wait("@BadRequest");
    cy.get("[id=linkResponse]").should(
      "have.text",
      "Link has responded with staus 400 and status text Bad Request"
    );
  });

  it.only("Forms test", () => {
    cy.viewport(1280, 1200);
    cy.visit("automation-practice-form");
    formsPage.fillInput("firstName", student.studentFirstName);
    formsPage.fillInput("lastName", student.studentLastName);
    formsPage.fillInput("userEmail", student.studentEmail);
    formsPage.setGender(student.studentGender);
    formsPage.fillInput("userNumber", student.mobile);
    formsPage.selectDateOfBirth(student.dateOfBirth);
    formsPage.selectSubjectByTyping(student.subjects.slice(0, 1));
    formsPage.selectSubjectByTypingAndSelecting(student.subjects.slice(1, 3));
    formsPage.setHobby(student.hobbies);
    formsPage.fileUpload(student.picture);
    // cy.get("[id='uploadPicture']").selectFile("cypress/fixtures/mobile.jpg");
    formsPage.fillInput("currentAddress", student.address);
    // cy.contains("Select State").click({force:true}).then(()=>{
    // 	cy.get("[id*='react-select-3-option']").contains("Haryana").click();
    // });
    // cy.contains("Select City").click({force:true}).then(()=>{
    // 	cy.contains("Panipat").click();
    // });
    formsPage.selectStateAndCity(student.state, student.city);
    formsPage.clickButton("submit");
    // cy.get("[id='submit']").click();
    const dateOfBirth = student.dateOfBirth.split(" ")[0]+" "+student.dateOfBirth.split(" ")[1]+","+student.dateOfBirth.split(" ")[2]

    const parameterNames = [
      "Student Name",
      "Student Email",
      "Gender",
      "Mobile",
      "Date of Birth",
      "Subjects",
      "Hobbies",
      "Picture",
      "Address",
      "State and City",
    ];
    const valueNames = [
      student.studentFirstName+" "+student.studentLastName,
      student.studentEmail,
      student.studentGender,
      student.mobile,
      dateOfBirth,
      student.subjects.toString().replace(/,/g,", "),
      student.hobbies.toString().replace(/,/g,", "),
      student.picture,
      student.address,
      student.state+" "+student.city,
    ];

    formsPage.assertFormTitleDisplayed();

    for (let i = 0; i < parameterNames.length; i++) {
      formsPage.assertFormValueDisplayed(parameterNames[i], valueNames[i]);   
    }
    formsPage.clickButton("closeLargeModal");
    // cy.get("[id='closeLargeModal']").click();
  });

  it("Modals test", () => {
    cy.visit("https://demoqa.com/modal-dialogs");
    modals.assertModalContent(
      "Small",
      "This is a small modal. It has very less content"
    );
    modals.assertModalContent(
      "Large",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );
  });
});
