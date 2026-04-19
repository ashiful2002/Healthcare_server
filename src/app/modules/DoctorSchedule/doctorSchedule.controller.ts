import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { DoctorScheduleService } from "./doctorSchedule.service";

const getAllDoctorSchedules = catchAsync(async (req, res) => {
    const schedules = await DoctorScheduleService.getAllDoctorSchedules();
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor schedules fetched successfully",
        data: schedules,
    });
})

const getDoctorScheduleById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const schedule = await DoctorScheduleService.getDoctorScheduleById(id as string);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor schedule fetched successfully",
        data: schedule,
    });
})
const createDoctorSchedule = catchAsync(async (req, res) => {
    const result = await DoctorScheduleService.createDoctorSchedule(req.body);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Doctor schedule created successfully",
        data: result,
    });
})
const updateDoctorSchedule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await DoctorScheduleService.updateDoctorSchedule(id as string, req.body);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor schedule updated successfully",
        data: result,
    });
})
const deleteDoctorSchedule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await DoctorScheduleService.deleteDoctorSchedule(id as string);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor schedule deleted successfully",
        data: result,
    });
})
export const DoctorScheduleController = {
    getAllDoctorSchedules,
    getDoctorScheduleById,
    createDoctorSchedule,
    updateDoctorSchedule,
    deleteDoctorSchedule
};