import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('my first test', () => {
    isTSAnyKeyword('does not do much', () => {
        expect(true).to.equal(true)
    })
})

describe('able to get to login page', () => {
    it('visits local host 4000', () => {
        cy.visit(`/`)
    })

    it('should hit login button and go to login page', () => {
        cy.visit(`/`)
        cy.get('.buttons')
        .first()
        .contains('login')
        .click()
    })

})

describe('Testing login functionality', () => {
    beforeEach(() => {
        cy.visit('/#/login')
    })

    it('able to enter Username', () => {
        cy.get('input[name=username]')
            .type('marshall')
            .should('have.value', 'marshall')
    })

    it('able to enter Password', () => {
        cy.get('input[name=password]')
            .type('password')
            .should('have.value', 'password')
    })

    it('should login using a username and password', () => {

        cy.get('input[name=username]')
            .type('marshall')
            .should('have.value', 'marshall')

        cy.get('input[name=password]')
            .type('password')
            .should('have.value', 'password')

        cy.get('.login-card')
        .first()
        .contains('Login')
        .click()
    })

})