import { SessionData } from "express-session"
import { User } from './src/shared/User'

declare module "express-session" {
    interface SessionData {
        user: User
    }
}