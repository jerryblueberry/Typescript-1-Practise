import { Router } from "express";
import { handleSignup } from "../controller/userController";
import { singleUpload } from "../middleware/uploadMiddleware";

const router: Router = Router();

router.post("/signup", singleUpload, handleSignup);

export default router;
