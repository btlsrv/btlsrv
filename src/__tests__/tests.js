const functions = require('../test-functions/module-export-functions')

test('2 plus 2 eq 4', () => {
    expect(functions.add(2, 2)).toBe(4)
})

describe('Dashboard Component tests', () => {
    it('getMaps should be a function', () => { // test done by Riley
        expect(typeof functions.getMaps).toBe('function')
    })

    it('ondrop should be a function', () => { // test done by Riley
        expect(typeof functions.onDrop).toBe('function')
    })

    it('setFiveColumn should be a function', () => { // test done by Riley
        expect(typeof functions.setFiveColumn).toBe('function')
    })

    it('setFiveRow should be a function', () => { // test done by Riley
        expect(typeof functions.setFiveRow).toBe('function')
    })

    it('setFourColumn should be a function', () => { // test done by Riley
        expect(typeof functions.setFourColumn).toBe('function')
    })

    it('setFourRow should be a function', () => { // test done by Marshall
        expect(typeof functions.setFourRow).toBe('function')
    })

    it('setThreeBColumn should be a function', () => { // test done by Marshall
        expect(typeof functions.setThreeBColumn).toBe('function')
    })

    it('setThreeBRow should be a function', () => { // test done by Marshall
        expect(typeof functions.setThreeBRow).toBe('function')
    })

    it('setThreeColumn should be a function', () => { // test done by Marshall
        expect(typeof functions.setThreeColumn).toBe('function')
    })

    it('setThreeRow should be a function', () => { // test done by Marshall
        expect(typeof functions.setThreeRow).toBe('function')
    })

    it('setMap should be a function', () => { // test done by Devin
        expect(typeof functions.setMap).toBe('function')
    })

    it('addMap should be a function', () => { // test done by Devin
        expect(typeof functions.addMap).toBe('function')
    })

    it('deleteMap should be a function', () => { // test done by Devin
        expect(typeof functions.deleteMap).toBe('function')
    })
})

describe('testing on login component', () => {
    it('that handleChange is a function', () => { // test done by Devin
        expect(typeof functions.handleChange).toBe('function')
    })

    it('that handleLogin is a function', () => { // test done by Derek
        expect(typeof functions.handleLogin).toBe('function')
    })
})

describe('AddMap component test', () => {
    it('saveMap should be a function', () => { // test done by Derek
        expect(typeof functions.saveMap).toBe('function')
    })

    it('handleRotate should be a function', () => { // test done by Derek
        expect(typeof functions.handleRotate).toBe('function')
    })
})

describe('User reducer testing', () => {
    it('getUser should be a function', () => { // test done by Derek
        expect(typeof functions.getUser).toBe('function')
    })

    it('login should be a function', () => { // test done by Derek
        expect(typeof functions.login).toBe('function')
    })

    it('logout should be a function', () => { // test done by Derek
        expect(typeof functions.logout).toBe('function')
    })
})
