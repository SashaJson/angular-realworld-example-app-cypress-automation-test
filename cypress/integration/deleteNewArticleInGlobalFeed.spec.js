/// <reference> types="cypress" />

describe('Testing delete a new Article in a global feed', () => {

    before('Login to the app', () => {
        cy.loginToApplication();
    });

    it('Example first test', () => {

        const bodyRequest = {
            "article": {
                "tagList": [],
                "title": "Request from API",
                "description": "API testing is easy",
                "body": "Angular is cool"
            }
        };

        cy.get('@token').then(token => {

            cy.request({
                url: Cypress.env('apiUrl') + 'articles/',
                headers: {'Authorization': 'Token ' + token},
                method: 'POST',
                body: bodyRequest
            }).then(res => {
                expect(res.status).to.equal(200);
            });

            cy.contains('Global Feed').click();
            cy.get('.article-preview').first().click();
            cy.get('.article-actions').contains('Delete Article').click();

            cy.request({
                url: Cypress.env('apiUrl') + 'articles?limit=10&offset=0',
                headers: {'Authorization': 'Token ' + token},
                method: 'GET'
            }).its('body').then(body => {
                expect(body.articles[0].title).not.to.equal('Request from API');
            });

        });

    });

});
