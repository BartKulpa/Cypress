class TextFields {
	static fillOutTextInput(id: string, value: string) {
		cy.get(`input[id="${id}"]`).type(value).blur();
	}

	static fillOutTextArea(id: string, value: string) {
		cy.get(`textarea[id="${id}"]`).type(value).blur();
	}

	static assertHaveValue(id: string, expectedValue: string) {
		cy.get(`p[id="${id}"]`).should("have.text", expectedValue);
	}

	static assertContainsValue(id: string, expectedValue: string) {
		cy.get(`p[id="${id}"]`).should("contain.text", expectedValue);
	}
}

export default TextFields;
