import { Router } from "express";
import { FacultyRouters } from "../modules/academicFaculty/faculty.route";
import { AcademicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { DepartmentRouters } from "../modules/department/department.route";
import { StudentRouters } from "../modules/student/student.route";
import { UserRouters } from "../modules/user/user.route";

const router = Router();

const moduleRouters = [
  {
    path: "/users",
    route: UserRouters,
  },
  {
    path: "/academicSemester",
    route: AcademicSemesterRouters,
  },
  {
    path: "/faculties",
    route: FacultyRouters,
  },
  {
    path: "/departments",
    route: DepartmentRouters,
  },
  {
    path: "/students",
    route: StudentRouters,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
