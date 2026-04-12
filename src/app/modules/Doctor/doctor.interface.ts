import { Gender } from "../../../generated/prisma";
export interface IUpdateDoctorSpecialtyPayload {
  specialtyId: string;
  shouldDelete: string;
}

export interface IUpdateDoctorPayload {
  name?: string;
  profilePhoto?: string;
  contactNumber?: string;
  registrationNumber?: string;
  experience?: number;
  gender?: Gender;
  appointmentFee?: number;
  qualification?: string;
  currentWorkingPlace?: string;
  designation?: string;
  specialties?: string[];
}
