import {add, getMaps, handleChange, handleLogin, setMap, addMap, deleteMap, saveMap, handleRotate, getUser, login, logout } from './functions'
import Profile from '../src/Components/Profile/Profile'

test('2 plus 2 eq 4', () => {
    expect(add(2, 2)).toBe(4)
})

describe('Dashboard Component tests', () => {
    it('getMaps should be a function', () => {
        expect(typeof getMaps).toBe('function')
    })

    it('maps should be an array', () => {
        expect(maps).toBeInstanceOf(Array)
    })

    it('maps should not be an obj', () => {
        expect(maps).not.toBe(Object)
    })

    it('maps should have a map_id property', () => {
        expect(maps).toHaveProperty ('map_id')
    })

    it('maps should have a user_id property', () => {
        expect(maps).toHaveProperty('user_id')
    })

    it('maps should have a name property', () => {
        expect(maps).toHaveProperty('name')
    })

    it('map_id type should be a number', () => {
        expect(typeof maps[0].map_id).toBe('number')
    })

    it('user_id type should be a number', () => {
        expect(typeof maps[0].user_id).toBe('number')
    })

    it('name type should be a string', () => {
        expect(typeof maps[0].name).toBe('string')
    })

    it('setMap should be a function', () => {
        expect(typeof setMap).toBe('function')
    })

    it('addMap should be a function', () => {
        expect(typeof addMap).toBe('function')
    })

    it('deleteMap should be a function', () => {
        expect(typeof deleteMap).toBe('function')
    })
})

describe('testing on login component', () => {
    it('that handleChange is a function', () => {
        expect(typeof handleChange).toBe('function')
    })

    it('that handleLogin is a function', () => {
        expect(typeof handleLogin).toBe('function')
    })
})

describe('AddMap component test', () => {
    it('saveMap should be a function', () => {
        expect(typeof saveMap).toBe('function')
    })

    it('handleRotate should be a function', () => {
        expect(typeof handleRotate).toBe('function')
    })
})

describe('User reducer testing', () => {
    it('getUser should be a function', () => {
        expect(typeof getUser).toBe('function')
    })

    it('login should be a function', () => {
        expect(typeof login).toBe('function')
    })

    it('logout should be a function', () => {
        expect(typeof logout).toBe('function')
    })
})

describe('Profile testing', () => {
    it('Profile should be a function', () => {
        expect(typeof Profile).toBe('function')
    })
})