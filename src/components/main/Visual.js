import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { useRef, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const path = process.env.PUBLIC_URL;

function Visual() {
	const frame = useRef(null);
	const cursor = useRef(null);
	const [num, setNum] = useState(3);
	let isCursor = false;

	const mouseMove = (e) => {
		if (isCursor) {
			cursor.current.style.left = e.clientX + 'px';
			cursor.current.style.top = e.clientY + 'px';
		}
	};

	const handleResize = () => {
		const wid = window.innerWidth;
		if (wid < 1179) {
			setNum(1);
		} else {
			setNum(3);
		}
	};

	useEffect(() => {
		frame.current.addEventListener('mouseenter', () => {
			isCursor = true;
			cursor.current.style.display = 'block';
		});
		frame.current.addEventListener('mouseleave', () => {
			isCursor = false;
			cursor.current.style.display = 'none';
		});
		window.addEventListener('mousemove', mouseMove);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('mousemove', mouseMove);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<figure className='myScroll on' ref={frame}>
			<Swiper
				spaceBetween={50}
				centeredSlides={true}
				grabCursor={true}
				loop={true}
				slidesPerView={num}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Pagination, Navigation]}>
				{[1, 2, 3, 4, 5].map((num) => {
					return (
						<SwiperSlide
							key={num}
							onMouseEnter={() => {
								cursor.current.style = 'transform: scale(8)';
							}}
							onMouseLeave={() => {
								cursor.current.style = 'transform: scale(1)';
							}}>
							<video
								src={`${path}/img/vid${num}.mp4`}
								loop
								autoPlay
								muted></video>
						</SwiperSlide>
					);
				})}
			</Swiper>

			<div className='cursor' ref={cursor}></div>
		</figure>
	);
}

export default Visual;
