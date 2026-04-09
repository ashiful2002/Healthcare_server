import status from "http-status";
import { Role } from "../../../generated/prisma";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { ISuperAdminUpdate } from "./superAdmin.interface";

const superAdminSelect = {
  id: true,
  userId: true,
  name: true,
  email: true,
  profilePhoto: true,
  contactNumber: true,
  isDeleted: true,
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
};

const getAllSuperAdmins = async () => {
  const superAdmins = await prisma.admin.findMany({
    where: {
      isDeleted: false,
      user: {
        role: Role.SUPER_ADMIN,
      },
    },
    select: superAdminSelect,
  });
  return superAdmins;
};

const getSuperAdminById = async (id: string) => {
  const superAdmin = await prisma.admin.findFirst({
    where: {
      id,
      isDeleted: false,
      user: {
        role: Role.SUPER_ADMIN,
      },
    },
    select: superAdminSelect,
  });

  if (!superAdmin) {
    throw new AppError(status.NOT_FOUND, "Super admin not found");
  }

  return superAdmin;
};

const updateSuperAdmin = async (id: string, payload: ISuperAdminUpdate) => {
  const superAdmin = await prisma.admin.findFirst({
    where: {
      id,
      isDeleted: false,
      user: {
        role: Role.SUPER_ADMIN,
      },
    },
  });

  if (!superAdmin) {
    throw new AppError(status.NOT_FOUND, "Super admin not found");
  }

  const result = await prisma.admin.update({
    where: { id },
    data: payload,
    select: superAdminSelect,
  });

  return result;
};

const deleteSuperAdmin = async (id: string) => {
  const superAdmin = await prisma.admin.findFirst({
    where: {
      id,
      isDeleted: false,
      user: {
        role: Role.SUPER_ADMIN,
      },
    },
  });

  if (!superAdmin) {
    throw new AppError(status.NOT_FOUND, "Super admin not found");
  }

  const result = await prisma.$transaction(async (tx) => {
    const deleted = await tx.admin.update({
      where: { id },
      data: { isDeleted: true },
      select: superAdminSelect,
    });

    await tx.user.update({
      where: { id: superAdmin.userId },
      data: { isDeleted: true },
    });

    return deleted;
  });

  return result;
};

export const SuperAdminService = {
  getAllSuperAdmins,
  getSuperAdminById,
  updateSuperAdmin,
  deleteSuperAdmin,
};