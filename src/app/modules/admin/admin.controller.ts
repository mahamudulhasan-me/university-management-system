import { OK } from "http-status";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const deleteAdmin = asyncHandler(async (req, res) => {
  const deletedAdmin = await AdminServices.deleteAdmin(req.params.id);
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: "Admin deleted successfully!",
    data: deletedAdmin,
  });
});

export const AdminControllers = {
  deleteAdmin,
};
