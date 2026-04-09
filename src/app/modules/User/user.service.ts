import status from "http-status";
import { Role } from "../../../generated/prisma";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import {
  IcreateDoctorPayload,
  ICreateAdmin,
  ICreateSuperAdmin,
} from "./user.interface";
import { Specialty } from "../../../generated/prisma";

// ─── helpers ────────────────────────────────────────────────────────────────

const assertEmailFree = async (email: string) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new AppError(status.CONFLICT, "User already exists");
};

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
    }
    specialities.push(Specialty);
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });
  if (userExists) {
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

      const doctorSpecialityData = specialities.map((specialty) => ({
        doctorId: doctorData.id,
        specialtyId: specialty.id,
      }));

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
  } catch (error) {
    throw error;
  }
};


const createAdmin = async (payload: ICreateAdmin) => {
  await assertEmailFree(payload.admin.email);

  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.admin.email,
      password: payload.password,
      role: Role.ADMIN,
      name: payload.admin.name,
      needPasswordChange: true,
    },
  });

  const admin = await prisma.admin.create({
    data: {
      userId: userData.user.id,
      ...payload.admin,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      email: true,
      profilePhoto: true,
      contactNumber: true,
      createdAt: true,
      updatedAt: true,
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

  return admin;
};

// ─── createSuperAdmin ────────────────────────────────────────────────────────

const createSuperAdmin = async (payload: ICreateSuperAdmin) => {
  await assertEmailFree(payload.admin.email);

  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.admin.email,
      password: payload.password,
      role: Role.SUPER_ADMIN,
      name: payload.admin.name,
      needPasswordChange: true,
    },
  });

  const superAdmin = await prisma.admin.create({
    data: {
      userId: userData.user.id,
      ...payload.admin,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      email: true,
      profilePhoto: true,
      contactNumber: true,
      createdAt: true,
      updatedAt: true,
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

  return superAdmin;
};

export const UserService = {
  createDoctor,
  createAdmin,
  createSuperAdmin,
};
