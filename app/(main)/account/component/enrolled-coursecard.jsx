import { Badge } from "@/components/ui/badge";
import { getCategoryDetails } from "@/queries/categories";
import { BookOpen } from "lucide-react";
import Image from "next/image";

const EnrolledCourseCard = async ({ enrolledment }) => {
  const category = await getCategoryDetails(
    enrolledment?.course?.category?._id
  );

  console.log({ category });

  return (
    <div className='group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full'>
      <div className='group relative w-full aspect-video rounded-md overflow-hidden'>
        <Image
          src={`/assets/images/courses/${enrolledment?.course?.thumbnail}`}
          alt={enrolledment?.course?.title}
          className='object-cover hover:scale-105 transition-all duration-300'
          fill
        />
      </div>
      <div className='flex flex-col pt-2'>
        <h3 className='text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2 cursor-pointer'>
          {enrolledment?.course?.title}
        </h3>
        <div className='text-xs text-muted-foreground'>{category?.title}</div>
        <div className='my-3 flex items-center gap-x-2 text-sm md:text-xs'>
          <div className='flex items-center gap-x-1 text-slate-500'>
            <div>
              <BookOpen className='w-4' />
            </div>
            <span>{enrolledment?.course?.modules?.length} Chapters</span>
          </div>
        </div>
        <div className=' border-b pb-2 mb-2'>
          <div className='flex items-center justify-between'>
            <p className='text-md md:text-sm font-medium text-slate-700'>
              Total Modules: {enrolledment?.course?.modules?.length}
            </p>
            <div className='text-md md:text-sm font-medium text-slate-700'>
              Completed Modules <Badge variant='success'>05</Badge>
            </div>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-md md:text-sm font-medium text-slate-700'>
              Total Quizzes: 10
            </p>

            <div className='text-md md:text-sm font-medium text-slate-700'>
              Quiz taken <Badge variant='success'>10</Badge>
            </div>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-md md:text-sm font-medium text-slate-700'>
              Mark from Quizzes
            </p>

            <p className='text-md md:text-sm font-medium text-slate-700'>50</p>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-md md:text-sm font-medium text-slate-700'>
              Others
            </p>

            <p className='text-md md:text-sm font-medium text-slate-700'>50</p>
          </div>
        </div>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-md md:text-sm font-medium text-slate-700'>
            Total Marks
          </p>

          <p className='text-md md:text-sm font-medium text-slate-700'>100</p>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
