it('titles are correct', () => {
    const page = cy.visit('http://localhost:4321/homepage');
  
    page.get('title').should('have.text', 'Homepage')
  });