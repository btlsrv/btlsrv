import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('Dashboard testing', () => {
    beforeEach(() => {
        cy.login()

        cy.visit('/#/dashboard')
    })

    it('users faction picture is displayed', () => { // test done by Riley
        cy.get('.dash-faction')
        .contains('img')
    })

    it('user can go to add map', () => { // test done by Riley
        cy.get('.map-button')
        .first()
        .contains('add map')
        .click()
    })

    it('page contains text for map button', () => { // test done by Riley
        cy.get('.top-message')
        cy.contains('p', 'click the pink "add map" button to get started')
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