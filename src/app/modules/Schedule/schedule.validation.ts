import { z } from "zod";

export const createScheduleValidationSchema = z.object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    }),
    startTime: z.string().refine((time) => /^\d{2}:\d{2}$/.test(time), {
        message: "Invalid time format"
    }),
    endTime: z.string().refine((time) => /^\d{2}:\d{2}$/.test(time), {
        message: "Invalid time format"
    }),
})

export const updateScheduleValidationSchema = z.object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    }).optional(),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    }).optional(),
    startTime: z.string().refine((time) => /^\d{2}:\d{2}$/.test(time), {
        message: "Invalid time format"
    }).optional(),
    endTime: z.string().refine((time) => /^\d{2}:\d{2}$/.test(time), {
        message: "Invalid time format"
    }).optional(),
})
