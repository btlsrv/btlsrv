import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('my first test', () => {
    it('does not do much', () => {
        expect(true).to.equal(true)
    })
})

describe('able to get to login page', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    
    it('welcomes you when you come to website', () => { // test done by marshall
        cy.contains('h1', 'welcome')
    })

    it('shows info on About info', () => {// test done by marshall
        cy.contains('h1', 'about')
    })

    it('should hit login button and go to login page', () => {// test done by marshall
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

    it('able to enter Username', () => {// test done by marshall
        cy.get('input[name=username]')
            .type('marshall')
            .should('have.value', 'marshall')
    })

    it('able to enter Password', () => {// test done by marshall
        cy.get('input[name=password]')
            .type('password')
            .should('have.value', 'password')
    })

    it('should login using a username and password', () => { // test done by Devan

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


    it('goes to the correct page after login', () => { // test done by Devan
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

        cy.hash().should('eq', '#/')
    })
})