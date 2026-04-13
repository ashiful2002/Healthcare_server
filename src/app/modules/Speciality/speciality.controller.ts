import { Request, Response } from "express";
import { SpecialityService } from "./speciality.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    icon: req.file?.path,
  };
  console.log(payload);

  const result = await SpecialityService.createSpecialist(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Speciality reated successfully",
    data: result,
  });
});

const getAllSpecialist = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialityService.getAllSpecialist();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Get all successfully",
    data: result,
  });
});
const deleteSpecialist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialityService.deleteSpecialist(id as string);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Delete data successfully",
    data: result,
  });
});

export const SpecialityController = {
  createSpecialty,
  getAllSpecialist,
  deleteSpecialist,
};
