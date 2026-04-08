import status from "http-status";
import { UserStatus } from "../../../generated/prisma";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";

interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

const registerPatient = async (payload: IRegisterPayload) => {
  try {
    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    if (!data.user) {
      // throw new Error("User creation failed");
      throw new AppError(status.BAD_REQUEST, "User creation failed");
    }

    try {
      // Create patient profile (example)
      const patient = await prisma.$transaction(async (tx) => {
        const patientTx = await tx.patient.create({
          data: {
            userId: data.user.id,
            name: payload.name,
            email: payload.email,
          },
        });
        return patientTx;
      });
      const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
      });
      const refreshToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
      });

      return { ...data, accessToken, refreshToken, patient };
    } catch (error) {
      console.log(error);
      // delete user if ebtter auth creaes
      await prisma.user.delete({
        where: {
          id: data.user.id,
        },
      });
      throw error;
    }
  } catch (error: any) {
    console.log(error);

    throw new AppError(
      status.BAD_REQUEST,
      error.message || "Registration failed"
    );
  }
};

interface iLoginUserPayload {
  email: string;
  password: string;
}

const loginUser = async (payload: iLoginUserPayload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (data.user.status === UserStatus.BLOCKED) {
    throw new AppError(status.FORBIDDEN, "User is blocked");
  }
  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new AppError(status.NOT_FOUND, "User account is deleted");
  }

  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  });
  const refreshToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  });

  return {
    ...data,
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  registerPatient,
  loginUser,
};

// npm i bcrypt
