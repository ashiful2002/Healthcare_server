import { Gender } from "../../../generated/prisma";

export interface IcreateDoctorPayload {
  password: string;
  doctor: {
    name: string;
    email: string;
    profilePhoto?: string; // matches String? in Prisma
    contactNumber?: string; // matches String? in Prisma
    address?: string; // matches String? in Prisma
    experiance?: number; // matches Int? in Prisma (if optional)
    registrationNumber: string;
    gender: Gender;
    appointMentFee: number;
    qualifications: string;
    currentWorkingPlace: string;
    designation: string;
  };
  specialities: string[];
}
