import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Game from "./pages/Game"
import Main from "./pages/Main"
import Account from "./pages/Account"
import { ADMIN_ROUTE, ACCOUNT_ROUTE, GAME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ACCOUNT_ROUTE,
        Component: Account
    },
    {
        path: GAME_ROUTE,
        Component: Game
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
]