import { Prisma } from "../../../generated/prisma/client";
export const doctorSearchableFields = [
  "name",
  "email",
  "qualifications",
  "designation",
  "currentWorkingPlace",
  "registrationNumber",
  "specialities.specialty.title",
];
export const doctorFilterableFields = [
  "gender",
  "isDeleted",
  "appointMentFee",
  "experiance",
  "registrationNumber",
  "specialities.specialtyId",
  "currentWorkingPlace",
  "designation",
  "qualifications",
  "specialities.specialty.title",
  "user.role",
];
export const doctorIncludeConfig: Partial<
  Record<
    keyof Prisma.DoctorInclude,
    Prisma.DoctorInclude[keyof Prisma.DoctorInclude]
  >
> = {
  user: true,
  specialities: {
    include: {
      specialty: true,
    },
  },
  appointments: {
    include: {
      patient: true,
      doctor: true,
    },
  },
  doctorSchedules: {
    include: {
      schedule: true,
    },
  },
  prescriptions: true,
  reviews: true,
};
