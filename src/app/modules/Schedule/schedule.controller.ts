import status from "http-status";
import { catchAsync } from "../../shared/catchAsync"
import { sendResponse } from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";

const getAllSchedules = catchAsync(async (req, res) => {
    const schedules = await ScheduleService.getAllSchedules();
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Schedules fetched successfully",
        data: schedules,
    });
})
const getScheduleById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const schedule = await ScheduleService.getScheduleById(id as string);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Schedule fetched successfully",
        data: schedule,
    });
})
const createSchedule = catchAsync(async (req, res) => {
    const result = await ScheduleService.createSchedule(req.body);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Schedule created successfully",
        data: result,
    });
})
const updateSchedule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScheduleService.updateSchedule(id as string, req.body);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Schedule updated successfully",
        data: result,
    });
})
const deleteSchedule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScheduleService.deleteSchedule(id as string);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Schedule deleted successfully",
        data: result,
    });
})
export const ScheduleController = {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
};