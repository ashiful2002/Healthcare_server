import { Role, UserStatus } from "../../../generated/prisma";

export interface IAdminFilterRequest {
  searchTerm?: string;
  email?: string;
  contactNumber?: string;
}

export interface IAdminUpdate {
  name?: string;
  profilePhoto?: string;
  contactNumber?: string;
}

export interface IChangeUserStatusPayload {
  userId: string
  userStatus: UserStatus
}

export interface IChangeUserRolePayload {
  userId: string
  role: Role
}
