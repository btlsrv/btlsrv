import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('Dashboard testing', () => {
    beforeEach(() => {
        cy.login()

        cy.visit('/#/dashboard')
    })

    it('user can got to view maps page', () => {
        cy.get('.dash')
        .first()
        .contains('view maps')
        .click()
    })

    it('user can go to add map', () => {
        cy.get('.dash')
        .first()
        .contains('add map')
        .click()
    })
})