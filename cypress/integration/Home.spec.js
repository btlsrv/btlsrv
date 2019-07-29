import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('/Home ', () => {
    beforeEach(() => {
        cy.login()

        cy.visit('/#')
    })

    it('h1 saying which page you are on', () => {
        cy.contains('h1', 'faction page')
    })
})