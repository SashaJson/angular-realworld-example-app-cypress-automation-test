describe('visual test', () => {
    it('should test snapshots',() => {
        cy.visit('/');
        cy.contains('Froms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').then(firstFrom => {

        });

    });
});
