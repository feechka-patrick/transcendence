// @ts-nocheck
import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor(){
        this._isAuth = false
        this._user = {}
        this._id = {}
        this._email = 'cake@gmail.com'
        this._games = []
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setEmail(data){
        this._email = data
    }

    setGames(games){
        this._games = games
    }

    setId(id){
        this._id = id
    }

    get id(){
        return this._id
    }

    get email(){
        return this._email
    }

    get isAuth(){
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get games(){
        return this._games
    }
};