import { add, addHours, addMinutes, format } from "date-fns";
import { ICreateDoctorSchedule } from "./schedule.interface"
import { convertDateTime } from "./schedule.utils";
import { prisma } from "../../lib/prisma";

const getAllSchedules = async () => {

}
const createSchedule = async (payload: ICreateDoctorSchedule) => {
    const { startDate, endDate, startTime, endTime } = payload;

    const interval = 30

    const currentDate = new Date(startDate);
    const lastDat = new Date(endDate)

    const schedules = []

    while (currentDate <= lastDat) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    new Date(`${format(currentDate, 'yyyy-MM-dd')}`),
                    Number(startTime.split(':')[0])   // hours
                ),
                Number(startTime.split(':')[1])       // minutes
            )
        );

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    new Date(`${format(currentDate, 'yyyy-MM-dd')}`),
                    Number(startTime.split(':')[0])   // hours
                ),
                Number(startTime.split(':')[1])       // minutes
            )
        );
        while (startDateTime < endDateTime) {
            const s = await convertDateTime(startDateTime)
            const e = await convertDateTime(addMinutes(startDateTime, interval))
            const scheduleData = {
                startDateTime: s,
                endDateTime: e,
            }
            const existingSchedule = await prisma.schedule.findFirst({
                where: {
                    startDateTime: scheduleData.startDateTime,
                    endDateTime: scheduleData.endDateTime,
                }
            })
            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                })
                schedules.push(result)
            }
            startDateTime.setMinutes(startDateTime.getMinutes() + interval)
        }

        startDateTime.setDate(startDateTime.getDate() + 1)
    }
    return schedules

}


const getScheduleById = async (id: string) => {

}
const updateSchedule = async (id: string, payload: any) => {

}
const deleteSchedule = async (id: string) => {

}

export const ScheduleService = {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
};