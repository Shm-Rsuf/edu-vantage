// import { CourseProgress } from "@/components/course-progress";
import { auth } from "@/auth";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/user";
import { redirect } from "next/navigation";
import EnrolledCourseCard from "../../component/enrolled-coursecard";

async function EnrolledCourses() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);
  console.log({ loggedInUser });

  const enrolledments = await getEnrollmentsForUser(loggedInUser.id);

  console.log({ enrolledments });

  return (
    <div className='grid sm:grid-cols-2 gap-6'>
      {enrolledments && enrolledments.length > 0 ? (
        enrolledments.map((enrolledment) => (
          <EnrolledCourseCard
            key={enrolledment.id}
            enrolledment={enrolledment}
          />
        ))
      ) : (
        <p className='text-center'>No Enrolled Found</p>
      )}
    </div>
  );
}

export default EnrolledCourses;
