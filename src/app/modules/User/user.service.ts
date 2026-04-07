import status from "http-status";
import { Role, Specialty } from "../../../generated/prisma";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { IcreateDoctorPayload } from "./user.interface";

const createDoctor = async (payload: IcreateDoctorPayload) => {
  const specialities: Specialty[] = [];

  for (const SpecialtyId of payload.specialities) {
    const Specialty = await prisma.specialty.findUnique({
      where: {
        id: SpecialtyId,
      },
    });
    if (!Specialty) {
      throw new AppError(
        status.NOT_FOUND,
        `Specialty with id ${SpecialtyId} not found`
      );
      // throw new Error(`Specialty with id ${SpecialtyId} not found`);
    }
    specialities.push(Specialty);
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });
  if (userExists) {
    // throw new Error("User with this email already exists");
    throw new AppError(status.CONFLICT, "User Already exists");
  }
  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.doctor.email,
      password: payload.password,
      role: Role.DOCTOR,
      name: payload.doctor.name,
      needPasswordChange: true,
    },
  });

  try {
    const result = await prisma.$transaction(async (tx) => {
      const doctorData = await tx.doctor.create({
        data: {
          userId: userData.user.id,
          ...payload.doctor,
        },
      });

      const doctorSpecialityData = specialities.map((specialty) => {
        return {
          doctorId: doctorData.id,
          specialtyId: specialty.id,
        };
      });
      await tx.doctorSpeciality.createMany({
        data: doctorSpecialityData,
      });

      const doctor = await tx.doctor.findUnique({
        where: { id: doctorData.id },
        select: {
          id: true,
          userId: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
          registrationNumber: true,
          experiance: true,
          gender: true,
          appointMentFee: true,
          qualifications: true,
          currentWorkingPlace: true,
          designation: true,
          createdAt: true,
          updatedAt: true,
          specialities: {
            select: {
              specialty: {
                select: {
                  title: true,
                  id: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
              emailVerified: true,
              image: true,
              isDeleted: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
      return doctor;
    });
    return result;
  } catch (error) {}
};

export const UserService = {
  createDoctor,
};
