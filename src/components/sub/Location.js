import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

const path = process.env.PUBLIC_URL;

function Locaition() {
	const { kakao } = window;
	const container = useRef(null);
	const info = [
		{
			title: '삼성동 코엑스',
			latlng: new kakao.maps.LatLng(37.51270548662555, 127.06069417327436),
			imgSrc: `${path}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '광화문 정문',
			latlng: new kakao.maps.LatLng(33.450701, 126.570667),
			imgSrc: `${path}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '남산 타워',
			latlng: new kakao.maps.LatLng(33.450701, 126.570667),
			imgSrc: `${path}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];

	const [map, setMap] = useState(null);
	const [mapInfo, setMapInfo] = useState(info);
	const [traffic, setTraffic] = useState(false);

	useEffect(() => {
		const options = {
			center: mapInfo[0].latlng,
			level: 3,
		};
		const map_instance = new kakao.maps.Map(container.current, options);
		setMap(map_instance);

		//마커 위치 인스턴스 생성
		const markerPosition = mapInfo[0].latlng;

		//마커 이미지 인스턴스 생성
		const imageSrc = mapInfo[0].imgSrc;
		const imageSize = mapInfo[0].imgSize;
		const imageOption = mapInfo[0].imgPos;
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
