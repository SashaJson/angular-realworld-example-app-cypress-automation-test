/// <reference> types="cypress" />

const runOn = (browser, fn) => {
    if (Cypress.isBrowser(browser)) {
        fn();
    }
};

const ignoreOn = (browser, fn) => {
    if (Cypress.isBrowser(browser)) {
        fn();
    }
};

describe('Testing verify global feed likes count', () => {

    before('Login to the app', () => {
        cy.loginToApplication();
    });

    runOn('chrome', () => {
        it('Example first test', () => {

            cy.intercept('GET', '**/articles/feed*', {"articles": [], "articlesCount": 0});
            cy.intercept('GET', '**/articles*', {fixture: 'articles.json'});

            cy.contains('Global Feed').click();
            cy.get('app-article-list button').then(listOfButtons => {
                expect(listOfButtons[0]).to.contain('1');
                expect(listOfButtons[1]).to.contain('5');
            });

            cy.fixture('articles').then(file => {
                const articleLink = file.articles[1].slug;
                cy.intercept('POST', '**/articles/' + articleLink + '/favorite', file);
            });

            cy.get('app-article-list button')
                .eq(1)
                .click()
                .should('contain', '6');

        });
    });

});
