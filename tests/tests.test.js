const functions = require('./functions')

test('2 plus 2 eq 4', () => {
    expect(functions.add(2, 2)).toBe(4)
})