import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";

describe('/Home ', () => {
    beforeEach(() => {
        cy.login()

        cy.visit('/#')
    })

    it('h1 saying which page you are on', () => { // test done by Devan
        cy.contains('h1', 'faction page')
    })
})