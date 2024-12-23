import { replaceMongoIdInArray } from "@/lib/convertData";
import { Course } from "@/model/course-model";
import { Enrollment } from "@/model/enrollment-model";

export async function getEnrollmentsForCourse(courseId) {
  const enrollments = await Enrollment.find({ course: courseId }).lean();

  return replaceMongoIdInArray(enrollments);
}

export async function getEnrollmentsForUser(userId) {
  try {
    const enrollments = await Enrollment.find({ student: userId })
      .populate({ path: "course", model: Course })
      .lean();
    return replaceMongoIdInArray(enrollments);
  } catch (error) {
    throw new Error(error);
  }
}

export async function enrollForCourse(cuserId, userId, paymentMethod) {
  const newEnrollment = {
    course: cuserId,
    student: userId,
    method: paymentMethod,
    enrollment_date: Date.now(),
    status: "not-started",
  };

  try {
    const response = await Enrollment.create(newEnrollment);
    return response;
  } catch (error) {
    console.log(error);
  }
}
