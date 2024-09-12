import Image from "next/image";

const StarRating = ({ rating }) => {
  const stars = new Array(rating).fill(0);
  console.log(stars);

  return (
    <>
      {stars.map((star, index) => (
        <Image
          key={index}
          src={`/assets/star.svg`}
          width={20}
          height={20}
          alt=''
        />
      ))}
    </>
  );
};

export default StarRating;
