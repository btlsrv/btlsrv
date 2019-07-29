import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('testing register process', () => {
    beforeEach(() => {
        cy.visit('/#/register')
    })

    it('able to enter info in username input', () => { // test done by Derek
        cy.get('input[name=username]')
            .type('taco')
            .should('have.value', 'taco')
    })

    it('able to enter info in email input', () => { // test done by Derek
        cy.get('input[name=email]')
        .type('taco@email.com')
        .should('have.value', 'taco@email.com')
    })

    it('able to enter info in password input', () => { // test done by Derek
        cy.get('input[name=password]')
        .type('password')
        .should('have.value', 'password')
    })

    it('able to select a faction to join', () => { // test done by Derek
        cy.get('select').select('cyber monkeys')
    })

    it('able to register a new user', () => { // test done by Derek
        cy.visit('/')
        cy.get('.buttons')
        .first()
        .contains('register')
        .click()

        cy.get('input[name=username]')
            .type('taco')
            .should('have.value', 'taco')

        cy.get('input[name=email]')
            .type('taco@email.com')
            .should('have.value', 'taco@email.com')

        cy.get('input[name=password]')
            .type('password')
            .should('have.value', 'password')

        cy.get('select').select('cyber monkeys')
    })
})