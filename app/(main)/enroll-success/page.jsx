import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getCourseDetails } from "@/queries/courses";
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
  }

  return (
    <div className='h-full w-full flex-1 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center gap-6 max-w-[600px] text-center'>
        {paymentStatus === "succeeded" && (
          <>
            <CircleCheck className='w-32 h-32 bg-success rounded-full p-0 text-white' />
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
