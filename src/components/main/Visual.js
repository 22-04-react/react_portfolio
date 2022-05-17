import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const path = process.env.PUBLIC_URL;

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
				<SwiperSlide>
					<video src={`${path}/img/vid1.mp4`} loop autoPlay muted></video>
				</SwiperSlide>

				<SwiperSlide>
					<video src={`${path}/img/vid2.mp4`} loop autoPlay muted></video>
				</SwiperSlide>

				<SwiperSlide>
					<video src={`${path}/img/vid3.mp4`} loop autoPlay muted></video>
				</SwiperSlide>

				<SwiperSlide>
					<video src={`${path}/img/vid4.mp4`} loop autoPlay muted></video>
				</SwiperSlide>

				<SwiperSlide>
					<video src={`${path}/img/vid5.mp4`} loop autoPlay muted></video>
				</SwiperSlide>
			</Swiper>
		</figure>
	);
}

export default Visual;
