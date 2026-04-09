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
