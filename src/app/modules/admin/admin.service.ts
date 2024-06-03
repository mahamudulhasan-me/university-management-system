import { ClientSession, startSession } from "mongoose";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { AdminModel } from "./admin.model";

const deleteAdmin = async (id: string): Promise<any> => {
  const session: ClientSession = await startSession();
  let deletedAdmin;

  try {
    session.startTransaction();

    const existingAdmin = await AdminModel.findOne({ id });
    if (!existingAdmin) {
      throw new AppError(404, "Admin not found");
    }

    deletedAdmin = await AdminModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedAdmin) {
      throw new AppError(400, "Failed to delete admin");
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(400, "Failed to delete user");
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  return deletedAdmin;
};

export const AdminServices = {
  deleteAdmin,
};
