it('titles are correct', () => {
    const homepage = cy.visit('http://localhost:4321/homepage');
    homepage.get('title').should('have.text', 'Homepage | Character Builder D&D')

    const characterListPage = cy.visit('http://localhost:4321/character-list');
    characterListPage.get('title').should('have.text', 'Character List | Character Builder D&D')

    const myAccountPage = cy.visit('http://localhost:4321/my-account');
    myAccountPage.get('title').should('have.text', 'My Account | Character Builder D&D')

    const resourcesPage = cy.visit('http://localhost:4321/resources');
    resourcesPage.get('title').should('have.text', 'Resources | Character Builder D&D')
    
    const signUpPage = cy.visit('http://localhost:4321/sign-up');
    signUpPage.get('title').should('have.text', 'Sign Up | Character Builder D&D')

    const createNewCharacterPage = cy.visit('http://localhost:4321/create-new-character');
    createNewCharacterPage.get('title').should('have.text', 'Create New Character | Character Builder D&D')
  });