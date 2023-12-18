import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/pagination'


interface ImageSliderProps {
  urls: string[];
}
export default function ImageSlider({ urls }: ImageSliderProps) {
  const activeStyles =
    "acrtive:scale-[0.79] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zin-300";
  const inactiveStyles = "hidden text-gray-400";

  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="aboslute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button></button>
        <button></button>
      </div>

      <Swiper className="h-full w-full">
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              fill
              loading="eager"
              className="-z-10 h-full w-full object-cover object-center"
              src={url}
              alt="Product image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
