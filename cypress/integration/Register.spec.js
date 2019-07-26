import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('testing register process', () => {
    beforeEach(() => {
        cy.visit('/#/register')
    })

    it('able to enter info in username input', () => {
        cy.get('input[name=username]')
            .type('taco')
            .should('have.value', 'taco')
    })

    it('able to enter info in email input', () => {
        cy.get('input[name=email]')
        .type('taco@email.com')
        .should('have.value', 'taco@email.com')
    })

    it('able to enter info in password input', () => {
        cy.get('input[name=password]')
        .type('password')
        .should('have.value', 'password')
    })


    it('able to register a new user', () => {
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
    })
})