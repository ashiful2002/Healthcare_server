import { Specialty } from "../../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const createSpecialist = async (payload: Specialty) => {
  const speciality = await prisma.specialty.create({
    data: payload,
  });
  return speciality;
};

const getAllSpecialist = async () => {
  const speciality = await prisma.specialty.findMany();
  return speciality;
};

const deleteSpecialist = async (id: string) => {
  const speciality = await prisma.specialty.delete({
    where: {
      id,
    },
  });
  return speciality;
};

export const SpecialityService = {
  createSpecialist,
  getAllSpecialist,
  deleteSpecialist,
};
