import { Router } from "express";
import { AcademicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { FacultyRouters } from "../modules/faculty/faculty.route";
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
    path: "/faculty",
    route: FacultyRouters,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
