describe('Create New Character Page: Race Form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4321/create-new-character');
    });
  
    it('has correct options for race select', () => {
      cy.get('#progress-1-race').then(select => {
        const actualOptions = [...select[0].options].map(option => option.text);
        const expectedOptions = ['Select','High Elf', 'Dark Elf'];
        expect(actualOptions).to.deep.eq(expectedOptions);
      });
    });

    it('displays the corresponding div when a race is selected', () => {
        const raceValue = 'HighElf';        
        cy.get('#progress-1-race').select(raceValue);
        cy.get(`#${raceValue}`).should('be.visible');
        cy.get(`#${raceValue}`).should('not.have.attr', 'hidden');
    });

    it('correctly toggles visibility when switching between two races', () => {
        const options = [
          { value: 'DarkElf', expectedToShow: 'DarkElf', expectedToHide: 'HighElf' },
          { value: 'HighElf', expectedToShow: 'HighElf', expectedToHide: 'DarkElf' }
        ];
        options.forEach(option => {
          cy.get('#progress-1-race').select(option.value);
          cy.get(`#${option.expectedToShow}`).should('be.visible').and('not.have.attr', 'hidden');
          cy.get(`#${option.expectedToHide}`).should('not.be.visible');
        });
    });
});