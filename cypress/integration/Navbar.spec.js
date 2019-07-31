import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('Navbar Testing', () => {
    beforeEach(() => {
        cy.login()

        cy.visit('/#')
    })

    it('checks if the user can logout', () => { // test done by Devan
        cy.get('.link-container')
        .first()
        .contains('logout')
        .click()
    })

    it('user can go to dashboard page', () => { // test done by Devan
        cy.get('.link-container')
        .first()
        .contains('dashboard')
        .click()
    })
    
})