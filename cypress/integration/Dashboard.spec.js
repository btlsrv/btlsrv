import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('Dashboard testing', () => {
    beforeEach(() => {
        cy.login()

        cy.visit('/#/dashboard')
    })

    
    it('user can go to add map', () => { // test done by Riley
        cy.get('.map-button')
        .first()
        .contains('add map')
        .click()
    })
    
    it('can type in a map name', () => { // test done by Riley
        cy.get('.map-button')
        .first()
        .contains('add map')
        .click()

        cy.get('.add-map-input')
        .type('taco')
        .should('have.value', 'taco')
    })

    it('can cancel the create map process', () => { // test done by Riley
        cy.get('.map-button')
        .first()
        .contains('add map')
        .click()

        cy.get('.add-map-input')
        .type('taco')
        .should('have.value', 'taco')

        cy.get('.input-button-container')
        .first()
        .contains('cancel')
        .click()
    })

    it('page contains text for the leaderboard top ten', () => { // test done by Riley
        cy.get('.right-section-bottom')
        cy.contains('p', 'top ten players')
    })
    
    it('check if the dashboard is named', () => { // test done by Riley
        cy.get('.right-section-top')
        .contains('h2', 'marshall\'s dashboard')
    })
})