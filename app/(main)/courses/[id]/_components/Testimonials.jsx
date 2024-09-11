// import { SectionTitle } from "@/components/section-title";
// import { StarRating } from "@/components/star-rating";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = ({ testimonials }) => {
  return (
    <section className='pb-8 md:pb-12 lg:pb-24'>
      <div className='container'>
        {/* <SectionTitle className='mb-6'>Testimonials</SectionTitle> */}
        <Carousel
          opts={{
            align: "start",
          }}
          className='max-2xl:w-[90%] w-full mx-auto'
        >
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent className='py-4'></CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
