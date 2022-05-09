import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

const path = process.env.PUBLIC_URL;

function Locaition() {
	//window전역에서 kakao라는 이름으로 등록되어 있는 객체를 비구조할당으로 직접 변수에 할당
	const { kakao } = window;
	const container = useRef(null);
	const options = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	const [map, setMap] = useState(null);
	const [traffic, setTraffic] = useState(false);

	useEffect(() => {
		const map_instance = new kakao.maps.Map(container.current, options);
		setMap(map_instance);

		//마커 위치 인스턴스 생성
		const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

		//마커 이미지 인스턴스 생성
		const imageSrc = `${path}/img/marker1.png`;
		const imageSize = new kakao.maps.Size(232, 99);
		const imageOption = { offset: new kakao.maps.Point(116, 99) };
		const markerImage = new kakao.maps.MarkerImage(
			imageSrc,
			imageSize,
			imageOption
		);

		//마커 위치 인스턴스를 인수로 넣어서 마커 인스턴스 생성
		const marker = new kakao.maps.Marker({
			position: markerPosition,
			image: markerImage,
		});

		// 생성된 마커 인스턴스에 기존 map인스턴스를 연결해서 최종 마커 생성
		marker.setMap(map_instance);
	}, []);

	useEffect(() => {
		if (map) {
			traffic
				? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
		console.log(map);
	}, [traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>

			{/* 버튼 클릭할때마다 traffic값을 계속 토글하면서 변경 */}
			<button onClick={() => setTraffic(!traffic)}>
				{/* traffic값에 따라서 버튼 글자 변경 */}
				{traffic ? 'Traffic OFF' : 'Traffic ON'}
			</button>
		</Layout>
	);
}

export default Locaition;
