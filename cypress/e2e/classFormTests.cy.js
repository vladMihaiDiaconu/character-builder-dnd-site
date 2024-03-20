describe('Create New Character Page: Class Form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4321/create-new-character');
      cy.get('#progress-3').click();
    });
  
    it('Has correct options for class select', () => {
      cy.get('#progress-3-class').then(select => {
        const actualOptions = [...select[0].options].map(option => option.text);
        const expectedOptions = ['Select','Bard'];
        expect(actualOptions).to.deep.eq(expectedOptions);
      });
    });

    it('Displays the corresponding div when a class is selected', () => {
        const classValue = 'Bard';        
        cy.get('#progress-3-class').select(classValue);
        cy.get(`#${classValue}`).should('be.visible');
        cy.get(`#${classValue}`).should('not.have.attr', 'hidden');
    });

    // it('correctly toggles visibility when switching between two races', () => {
    //     const options = [
    //       { value: 'DarkElf', expectedToShow: 'DarkElf', expectedToHide: 'HighElf' },
    //       { value: 'HighElf', expectedToShow: 'HighElf', expectedToHide: 'DarkElf' }
    //     ];
    //     options.forEach(option => {
    //       cy.get('#progress-1-race').select(option.value);
    //       cy.get(`#${option.expectedToShow}`).should('be.visible').and('not.have.attr', 'hidden');
    //       cy.get(`#${option.expectedToHide}`).should('not.be.visible');
    //     });
    // });
});