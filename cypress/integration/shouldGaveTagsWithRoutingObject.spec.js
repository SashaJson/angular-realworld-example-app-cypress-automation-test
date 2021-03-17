/// <reference> types="cypress" />

describe('Testing should gave tags with routing object', () => {

    before('Login to the app', () => {
        cy.intercept({method: 'Get', path: 'tags'}, {fixture: 'tags.json'});
        cy.loginToApplication();
    });

    it('Example first test', () => {

        cy.get('.tag-list')
            .should('contain', 'cypress')
            .and('contain', 'automation')
            .and('contain', 'testing');

    });

});