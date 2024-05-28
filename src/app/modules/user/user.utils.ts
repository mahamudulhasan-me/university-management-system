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

  return lastStudentId?.id ? lastStudentId.id.substring(7) : undefined;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  const initialId = await findLastStudentId();
  const increaseId = (Number(initialId) + 1).toString().padStart(4, "0");

  const studentId = `${payload.year}${payload.code}-${increaseId}`;
  return studentId;
};
