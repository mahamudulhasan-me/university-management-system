import { startSession } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { IStudent } from "./student.interface";
import { StudentModel } from "./student.model";

// const getAllStudents = async (
//   query: Record<string, unknown>
// ): Promise<IStudent[]> => {
//   const queryObj = { ...query };
//   const searchTerm = query.searchTerm ? (query.searchTerm as string) : "";

//   const studentSearchableFields = [
//     "name.firstName",
//     "name.lastName",
//     "email",
//     "contactNumber",
//     "presentAddress.address",
//   ];

//   const searchQuery = StudentModel.find({
//     $or: studentSearchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: "i" },
//     })),
//   });

//   // filtering
//   const excludeFields = [
//     "searchTerm",
//     "sort",
//     "limit",
//     "limit",
//     "page",
//     "fields",
//   ];

//   excludeFields.forEach((ele) => delete queryObj[ele]);

//   const filterQuery = searchQuery
//     .find(queryObj)
// .populate("userId")
// .populate("admissionSemester")
// .populate({
//   path: "academicDepartment",
//   populate: { path: "academicFaculty" },
// });

//   const sort = query.sort ? (query.sort as string) : "-createdAt";

//   const sortQuery = filterQuery.sort(sort);

//   const limit = query.limit ? Number(query.limit) : 10;
//   const page = query.page ? Number(query.page) : 1;
//   const skip = (page - 1) * limit;

//   const skipQuery = sortQuery.skip(skip);
//   const limitQuery = skipQuery.limit(limit);

//   const fields = query?.fields
//     ? (query.fields as string).split(",").join("")
//     : "__v";

//   const finalQuery = await limitQuery.select(fields).exec();

//   return finalQuery;
// };

const getAllStudents = async (
  query: Record<string, unknown>
): Promise<IStudent[]> => {
  const studentSearchableFields = [
    "name.firstName",
    "name.lastName",
    "email",
    "contactNumber",
    "presentAddress.address",
  ];

  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate("userId")
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: { path: "academicFaculty" },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const students = await studentQuery.modelQuery.exec();
  return students;
};
const getStudentById = async (studentId: string): Promise<IStudent | null> => {
  const student = await StudentModel.findById(studentId)
    .populate("userId")
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: { path: "academicFaculty" },
    })
    .exec();

  return student;
};

const deleteStudentById = async (studentId: string) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const isStudentExit = await StudentModel.findOne({ id: studentId });
    if (!isStudentExit) throw new AppError(404, "This student not exit!");

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) throw new AppError(400, "Failed to delete student!");

    const deletedUser = await UserModel.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) throw new AppError(400, "Failed to delete user");

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const {
    name,
    presentAddress,
    permanentAddress,
    guardian,
    localGuardian,
    ...remainingStudentInfo
  } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentInfo,
  };
  const updateNestedFields = (object: any, prefix: string) => {
    if (object && Object.keys(object).length) {
      for (const [key, value] of Object.entries(object)) {
        modifiedUpdatedData[`${prefix}.${key}`] = value;
      }
    }
  };

  updateNestedFields(name, "name");
  updateNestedFields(presentAddress, "presentAddress");
  updateNestedFields(permanentAddress, "permanentAddress");
  updateNestedFields(guardian, "guardian");
  updateNestedFields(localGuardian, "localGuardian");

  // if (presentAddress && Object.keys(presentAddress)) {
  //   for (const [key, value] of Object.entries(presentAddress)) {
  //     modifiedUpdatedData[`presentAddress.${key}`] = value;
  //   }
  // }
  // if (permanentAddress && Object.keys(permanentAddress)) {
  //   for (const [key, value] of Object.entries(permanentAddress)) {
  //     modifiedUpdatedData[`permanentAddress.${key}`] = value;
  //   }
  // }
  // if (guardian && Object.keys(guardian)) {
  //   for (const [key, value] of Object.entries(guardian)) {
  //     modifiedUpdatedData[`guardian.${key}`] = value;
  //   }
  // }
  // if (localGuardian && Object.keys(localGuardian)) {
  //   for (const [key, value] of Object.entries(localGuardian)) {
  //     modifiedUpdatedData[`localGuardian.${key}`] = value;
  //   }
  // }

  const updatedStudent = await StudentModel.findOneAndUpdate(
    {
      id,
    },
    modifiedUpdatedData,
    { new: true }
  );

  return updatedStudent;
};

export const StudentServices = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudent,
};
