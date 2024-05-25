import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student } = req.body;
    const createdStudent = await UserServices.createStudent(password, student);
    res.status(201).json({
      success: true,
      message: "Student Created Successfully",
      data: createdStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const UserControllers = {
  createStudent,
};
