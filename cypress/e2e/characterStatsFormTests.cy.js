describe('Create New Character Page: Character Stats Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4321/create-new-character');
        cy.get('#progress-2').click();
    });
  
    it('Changes the dice values on roll', () => {
        let initialDiceValues = [];
        cy.get('.dice').each(($el) => {
          initialDiceValues.push($el.text());
        }).then(() => {
          cy.get('#roll-button').click();
          cy.wait(1000);
          cy.get('.dice').each(($el, index) => {
            cy.wrap($el).invoke('text').should('not.equal', initialDiceValues[index]);
          });
        });
      });

      it('Displays the sum of the top three rolls', () => {
        cy.get('#roll-button').click();
        cy.wait(1000);
    
        cy.get('#sum-display').invoke('text').then((text) => {
          const sum = parseInt(text.replace(/\D/g, ''), 10); 
          expect(sum).to.be.at.least(3);
          expect(sum).to.be.at.most(18);
        });
      });

      it('Prevents user from rolling more than 6 times', () => {
        for (let i = 0; i < 6; i++) {
          cy.get('#roll-button').click();
          cy.wait(500);
        }
        cy.get('#roll-button').should('be.disabled');
      });
  });