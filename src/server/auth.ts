import express, { Router } from "express"
import { AuthController } from "../shared/AuthController";
import { User } from "../shared/User";
import { remultExpress } from "remult/remult-express";

export const auth = Router();

const api = remultExpress({
    entities: [User],
    admin: true
});

auth.use(express.json())

auth.use(api);
auth.use(api.withRemult);

auth.post("/api/register", async (req, res) => {
    const newUser = await AuthController.register(req.body);
    if (newUser) {
        req.session.user = newUser;
        res.json(newUser);
    } else {
        res.status(404).json("Invalid user");
    }
});

auth.post("/api/logOut", async (req, res) => {
    req.session.user = undefined;
    res.json("logged out");
});