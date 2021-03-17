/// <reference> types="cypress" />

describe('Testing intercepting and modifying the request and response', () => {

    before('Login to the app', () => {
        cy.loginToApplication();
    });

    it('Example first test', () => {

        // cy.intercept('POST', '**/articles', req => {
        //     req.body.article.description = 'This is a description 2';
        // }).as('postArticles');

        cy.intercept('POST', '**/articles', req => {
            req.reply(res => {
                expect(res.body.article.description).to.equal('This is a description');
                res.body.article.description = 'This is a description 2';
            });
        }).as('postArticles');

        cy.contains('New Article').click();
        cy.get('[formcontrolname="title"]').type('This is a title');
        cy.get('[formcontrolname="description"]').type('This is a description');
        cy.get('[formcontrolname="body"]').type('This is a body of the Article');
        cy.contains('Publish Article').click();

        cy.wait('@postArticles');
        cy.get('@postArticles').then(xhr => {
            expect(xhr.response.statusCode).to.equal(200);
            expect(xhr.request.body.article.body).to.equal('This is a body of the Article');
            expect(xhr.response.body.article.description).to.equal('This is a description 2');
        });

    });

});