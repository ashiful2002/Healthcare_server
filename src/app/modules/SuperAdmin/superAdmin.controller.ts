import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { SuperAdminService } from "./superAdmin.service";

const getAllSuperAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await SuperAdminService.getAllSuperAdmins();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Super admins retrieved successfully",
    data: result,
  });
});

const getSuperAdminById = catchAsync(async (req: Request, res: Response) => {
  const result = await SuperAdminService.getSuperAdminById(
    req.params.id as string
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Super admin retrieved successfully",
    data: result,
  });
});

const updateSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await SuperAdminService.updateSuperAdmin(
    req.params.id as string,
    req.body
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Super admin updated successfully",
    data: result,
  });
});

const deleteSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await SuperAdminService.deleteSuperAdmin(
    req.params.id as string
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Super admin deleted successfully",
    data: result,
  });
});

export const SuperAdminController = {
  getAllSuperAdmins,
  getSuperAdminById,
  updateSuperAdmin,
  deleteSuperAdmin,
};
