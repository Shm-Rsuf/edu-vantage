"use client";
import { createCheckoutSession } from "@/app/actions/stripe";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";

export const EnrollmentCourse = ({ asLink }) => {
  /* handlaFormAction  */
  const handlaFormAction = async (data) => {
    const { url } = await createCheckoutSession(data);

    window.location.assign(url);
  };
  return (
    <>
      <form action={handlaFormAction}>
        {asLink ? (
          <Button
            variant='ghost'
            type='submit'
            className='text-xs text-sky-700 h-7 gap-1'
          >
            Enroll
            <ArrowRight className='w-3' />
          </Button>
        ) : (
          <Button href='' className={cn(buttonVariants({ size: "lg" }))}>
            Enroll Now
          </Button>
        )}
      </form>
    </>
  );
};
