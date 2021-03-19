// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginToApplication', () => {
    // it is bad practice publish credential in repo
    const userCredentials = {
        "user": {
            "email": "sashamiller666+1@gmail.com",
            "password": "Cypress14789"
        }
    };

    cy.request('POST', 'https://conduit.productionready.io/api/users/login', userCredentials)
        .its('body').then(body => {
        const token = body.user.token;
        cy.wrap(token).as('token');
        cy.visit('/', {
            onBeforeLoad(win) {
                win.localStorage.setItem('jwtToken', token);
            }
        });
    });

});
