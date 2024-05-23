export interface IUser {
  id: string;
  password: string;
  needsPasswordReset: boolean;
  role: "admin" | "student" | "faculty";
  status: "active" | "inactive";
  isDeleted: boolean;
}
