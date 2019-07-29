import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('Dashboard testing', () => {
    beforeEach(() => {
        cy.login()

        cy.visit('/#/dashboard')
    })

    it('user can got to view maps page', () => { // test done by Riley
        cy.get('.dash')
        .first()
        .contains('view maps')
        .click()
    })

    it('user can go to add map', () => { // test done by Riley
        cy.get('.dash')
        .first()
        .contains('add map')
        .click()
    })

    it('page contains text for each map user made', () => { // test done by Riley
        cy.contains('p', 'set a map to start or join a game!')
    })

    it('page contains text for the leaderboard', () => { // test done by Riley
        cy.contains('p', 'leaderboard')
    })
    
    it('user can delete maps', () => { // test done by Riley
        cy.get('.map')
        .first()
        .contains('delete')
        .click()
    })
})