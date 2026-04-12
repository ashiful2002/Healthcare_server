import { waitForDebugger } from "node:inspector";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";
import AppError from "../../errorHelpers/AppError";
import status from "http-status";
import { UserStatus } from "../../../generated/prisma";

const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      user: true,
      specialities: {
        include: {
          specialty: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return doctors;
};

const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  return { doctor };
};

const updateDoctor = async (
  id: string,
  payload: Partial<IUpdateDoctorPayload>
) => {
  const existDoctor = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existDoctor) {
    throw new Error("couldn't find doctor");
  }
  const updated = await prisma.doctor.update({
    where: {
      id: id,
    },
    data: {
      ...payload,
      //      name: payload.name,
      //   profilePhoto: payload.profilePhoto,
      //   contactNumber: payload.contactNumber,
      //   address: payload.address,
      //   experiance: payload.experiance,
    },
  });
  return { updated };
};

const deleteDoctor = async (id: string) => {
  const existDoctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  if (!existDoctor) {
    throw new AppError(status.NOT_FOUND, "Doctor Not Found");
  }

  await prisma.$transaction(async (tx) => {
    await tx.doctor.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        DeletedAt: new Date(),
      },
    });

    await tx.user.update({
      where: {
        id: existDoctor.userId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        status: UserStatus.DELETED,
      },
    });
    await tx.session.deleteMany({
      where: {
        userId: existDoctor.userId,
      },
    });
    await tx.doctorSchedules.deleteMany({
      where: {
        doctorId: id,
      },
    });
  });
  return {
    message: "Doctor deleted successfully",
  };
};

export const DoctorService = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
