import express, { Router } from "express";
import { login } from "./auth.controller";
import { validator } from "../../midllewares/validator";
import { validateAuth } from "../../dto/auth.dto";

const router: Router = express.Router();

router.route('/login').post(validator({ validator: validateAuth}), login)

export const AuthRouter = router