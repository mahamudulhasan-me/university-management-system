import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastUserId = async (role: string) => {
  const lastUserId = await UserModel.findOne({ role }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUserId?.id;
};

const generateNextId = async (role: string, prefix: string) => {
  const lastId = (await findLastUserId(role)) || `${prefix}-0000`;

  const numericPart = lastId.slice(prefix.length + 1);
  const newNumericPart = (parseInt(numericPart, 10) + 1)
    .toString()
    .padStart(4, "0");

  return `${prefix}-${newNumericPart}`;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  let initialId = "0001";
  const lastStudentId = await findLastUserId("student");

  if (lastStudentId) {
    const lastYear = lastStudentId.substring(0, 4);
    const lastSemCode = lastStudentId.substring(4, 6);
    const isSameLastAndCurSemYear = payload.year === lastYear;
    const isSameLastAndCurSemCode = payload.code === lastSemCode;

    if (isSameLastAndCurSemYear && isSameLastAndCurSemCode) {
      initialId = lastStudentId.substring(7);
    }
  }

  const increaseId = (Number(initialId) + 1).toString().padStart(4, "0");
  return `${payload.year}${payload.code}-${increaseId}`;
};

export const generateAdminId = async () => {
  return generateNextId("admin", "A");
};

export const generateFacultyId = async () => {
  return generateNextId("faculty", "F");
};
