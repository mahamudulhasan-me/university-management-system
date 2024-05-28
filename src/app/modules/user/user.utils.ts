import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async () => {
  const lastStudentId = await UserModel.findOne(
    {
      role: "student",
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudentId?.id ? lastStudentId.id : undefined;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  let initialId = (0).toString();

  const lastStudentId = await findLastStudentId();
  const lastYear = lastStudentId?.substring(0, 4);
  const lastSemCode = lastStudentId?.substring(4, 6);
  const isSameLastAndCurSemYear = payload.year === lastYear;
  const isSameLastAndCurSemCode = payload.code === lastSemCode;

  if (lastStudentId && isSameLastAndCurSemYear && isSameLastAndCurSemCode) {
    initialId = lastStudentId?.substring(7);
  }
  const increaseId = (Number(initialId) + 1).toString().padStart(4, "0");

  const studentId = `${payload.year}${payload.code}-${increaseId}`;
  return studentId;
};
