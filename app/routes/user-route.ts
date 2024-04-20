import { Router } from "express";
import { handleSignup } from "../controller/userController";

const router: Router = Router();

router.post("/signup", handleSignup);

export default router;
