import { UserData } from "../types";

export default class FormsPage {

    fillInput (id:string, value: string){
        cy.get(`[id='${id}']`).type(value).blur();
    }

    setGender (value: string){

        cy.get(`input[value='${value}']`).check({force:true});

    }

    setHobby (hobbies: Array<string>){
    
        hobbies.forEach(hobby => {
            cy.contains("label",hobby).siblings("input").check({force:true});
        })        
    
    }       

    selectDateOfBirth(date: string){
        
        let day: string = date.split(' ')[0];
        let month: string = date.split(' ')[1];
        let year: string = date.split(' ')[2];
        
        cy.get("[id='dateOfBirthInput']").click();
		cy.get("select[class*='month-select']").select(month);
        cy.get("select[class*='year-select']").select(year);
        cy.get("div[class*='current-month']").should('contain.text', month).should('contain.text', year);
        cy.get("div[class^='react-datepicker__day']").contains(day).click();
        cy.get("input[id='dateOfBirthInput']").should('have.value', `${day} ${month.slice(0,3)} ${year}`)

    }

    selectSubjectByTyping(subjectNames: Array<string>){
        subjectNames.forEach(subjectName=>{
cy.get("[id='subjectsInput']").type(`${subjectName}{Enter}`);
        })
        
    }

    selectSubjectByTypingAndSelecting(subjectNames: Array<string>){
        subjectNames.forEach(subjectName=>{
            cy.get("[id='subjectsInput']").type(`${subjectName.slice(0,2)}`).then(()=>{
                cy.get("[id*='react-select-2-option']").contains(subjectName).click();
            });
                    })
        
        
    }

    selectStateAndCity(state: string, city: string){
        cy.contains("Select State").click({force:true}).then(()=>{
			cy.get("[id*='react-select-3-option']").contains(state).click();
		});
		cy.contains("Select City").click({force:true}).then(()=>{
			cy.contains(city).click();
		});

    }

    fileUpload(filename: string){
        cy.get("[id='uploadPicture']").selectFile(`cypress/fixtures/${filename}`);
    }

    clickButton(buttonId: string){
        cy.get(`[id='${buttonId}']`).click();
    }

    assertFormTitleDisplayed(){
        cy.get("[id='example-modal-sizes-title-lg']").should(
            "have.text",
            "Thanks for submitting the form"
          );

    }

    assertFormValueDisplayed(label: string, value: string){
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
                
          cy.contains("td", label).siblings("td").should("have.text", value);
    }

}