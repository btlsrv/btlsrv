import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('Dashboard testing', () => {
    beforeEach(() => {
        cy.login()

        cy.visit('/#/dashboard')
    })

    
})