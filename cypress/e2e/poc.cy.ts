describe("QA workshop", () => {
	it("First test", () => {
		cy.visit("https://demoqa.com");
		cy.contains("Elements").click();
		cy.contains("Text Box").click();
		cy.get('input[id="userName"]')
			.should("have.attr", "placeholder", "Full Name")
			.clear()
			.type("Marta  Rydel")
			.blur();
		cy.pause();
	});
});
