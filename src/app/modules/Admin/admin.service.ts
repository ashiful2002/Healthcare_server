import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { IAdminUpdate } from "./admin.interface";
import { IRequestUser } from "../../interfaces/requestUser.interface";

const adminSelect = {
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

const getAllAdmins = async () => {
  const admins = await prisma.admin.findMany({
    where: { isDeleted: false },
    select: adminSelect,
  });
  return admins;
};

const getAdminById = async (id: string) => {
  const admin = await prisma.admin.findUnique({
    where: { id, isDeleted: false },
    select: adminSelect,
  });

  if (!admin) {
    throw new AppError(status.NOT_FOUND, "Admin not found");
  }

  return admin;
};

const updateAdmin = async (id: string, payload: IAdminUpdate) => {
  const admin = await prisma.admin.findUnique({
    where: { id, isDeleted: false },
  });

  if (!admin) {
    throw new AppError(status.NOT_FOUND, "Admin not found");
  }

  const result = await prisma.admin.update({
    where: { id },
    data: payload,
    select: adminSelect,
  });

  return result;
};

const deleteAdmin = async (id: string, user: IRequestUser) => {
  const isAdminExist = await prisma.admin.findUnique({
    where: { id, isDeleted: false },
  });

  if (!isAdminExist) {
    throw new AppError(status.NOT_FOUND, "Admin not found");
  }
  if (isAdminExist.id === user.userId) {
    throw new AppError(status.BAD_REQUEST, "You cannot delete yourself");
  }
  const result = await prisma.$transaction(async (tx) => {
    const deletedAdmin = await tx.admin.update({
      where: { id },
      data: { isDeleted: true },
      select: adminSelect,
    });

    await tx.user.update({
      where: { id: isAdminExist.userId },
      data: { isDeleted: true },
    });

    return deletedAdmin;
  });

  return result;
};

export const AdminService = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
