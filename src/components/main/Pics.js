function Pics(props) {
	//현재 스크롤 되는 거리값
	const scrolled = props.scrolled;
	//해당 섹션의 세로 위치값
	const start = props.start;
	//스크롤 위치 보정값
	//(양수: 기준점을 위로 끌어올림, 음수: 기준점을 아래로 내림)
	const base = 400;
	const position = scrolled - start + base;

	return (
		<section id='pics' className='myScroll'>
			<h2
				style={
					//보정된 현재 섹션의 위치값에 도달해야지 스타일값 연동
					position >= 0
						? { transform: `translateX(${position / 1.2}px)` }
						: null
				}>
				FLICKR
			</h2>
			<p
				style={
					position >= 0
						? {
								transform: `translateX(${position * 2}px) scale(${
									1 + position / 1000
								})`,
						  }
						: null
				}>
				FLICKR
			</p>
		</section>
	);
}

export default Pics;
