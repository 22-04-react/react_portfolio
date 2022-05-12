import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Visual() {
	return (
		<figure className='myScroll on'>
			<Swiper
				spaceBetween={50}
				centeredSlides={true}
				grabCursor={true}
				loop={true}
				slidesPerView={3}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Pagination, Navigation]}>
				<SwiperSlide>1</SwiperSlide>
				<SwiperSlide>2</SwiperSlide>
				<SwiperSlide>3</SwiperSlide>
				<SwiperSlide>4</SwiperSlide>
				<SwiperSlide>5</SwiperSlide>
			</Swiper>
		</figure>
	);
}

export default Visual;
