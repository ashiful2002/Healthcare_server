import { UserStatus } from "../../../generated/prisma";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

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
      throw new Error("User creation failed");
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

      return { ...data, patient };
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
    throw new Error(error.message || "Registration failed");
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
    throw new Error("User is Blocked");
  }
  if (data.user.isDeleted || data.user.status === UserStatus.BLOCKED) {
    throw new Error(" user is Deleetd");
  }
  return data;
};

export const AuthService = {
  registerPatient,
  loginUser,
};

// npm i bcrypt
