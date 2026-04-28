import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { PatientController } from "./patient.controller";
import { PatientValidation } from "./patient.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma";
import { updateMyPatientProfileMiddleware } from "./patient.middleware";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.patch("/update-my-profile",
    checkAuth(Role.PATIENT),
    multerUpload.fields([
        { name: "profilePhoto", maxCount: 1 },
        { name: "medicalReports", maxCount: 5 }
    ]),
    updateMyPatientProfileMiddleware,
    validateRequest(PatientValidation.updatePatientProfileZodSchema),
    PatientController.updateMyProfile
)

export const PatientRoutes = router;