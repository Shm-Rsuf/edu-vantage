import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { enrollForCourse } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/user";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams: { session_id, courseId } }) => {
  if (!session_id) {
    throw new Error("Session id not found, please provide session id");
  }
  const userSession = await auth();

  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const course = await getCourseDetails(courseId);
  const loggedInUser = await getUserByEmail(userSession?.user?.email);
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  // Cutomer info
  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
  const customerEmail = loggedInUser?.email;
  const productName = course?.title;

  const paymentIntent = checkoutSession?.payment_intent;
  const paymentStatus = paymentIntent?.status;

  if (paymentStatus === "succeeded") {
    // Update DB(Enrollment collection)
    const enrolled = await enrollForCourse(
      course?.id,
      loggedInUser?.id,
      "stripe"
    );

    console.log(enrolled);

    const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
    const instructorEmail = course?.instructor?.email;

    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New Enrollment for ${productName}.`,
        message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${productName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
      },
      {
        to: customerEmail,
        subject: `Enrollment Success for ${productName}`,
        message: `Hey ${customerName} You have successfully enrolled for the course ${productName}`,
      },
    ];

    // const emailSentResponse = await sendEmails(emailsToSend);
    // console.log(emailSentResponse);
  }

  return (
    <div className='h-full w-full flex-1 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center gap-6 max-w-[600px] text-center'>
        {paymentStatus === "succeeded" && (
          <>
            <CircleCheck className='w-32 h-32 bg-green-500 rounded-full p-0 text-white' />
            <h1 className='text-xl md:text-2xl lg:text-3xl'>
              Congratulations, <strong>{customerName}</strong>! Your Enrollment
              was Successful for <strong>{productName}</strong>
            </h1>
          </>
        )}
        <div className='flex items-center gap-3'>
          <Button asChild size='sm'>
            <Link href='/courses'>Browse Courses</Link>
          </Button>
          <Button asChild variant='outline' size='sm'>
            <Link href='/think-in-a-redux-way/introduction'>Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Success;
