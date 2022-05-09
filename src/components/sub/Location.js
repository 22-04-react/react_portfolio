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
			latlng: new kakao.maps.LatLng(37.57610410883431, 126.97682701566524),
			imgSrc: `${path}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '남산 타워',
			latlng: new kakao.maps.LatLng(37.55145453146031, 126.98818533168571),
			imgSrc: `${path}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];

	const [map, setMap] = useState(null);
	const [mapInfo] = useState(info);
	const [traffic, setTraffic] = useState(false);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const options = {
			center: mapInfo[index].latlng,
			level: 3,
		};
		const map_instance = new kakao.maps.Map(container.current, options);
		setMap(map_instance);

		const markerPosition = mapInfo[index].latlng;

		const imageSrc = mapInfo[index].imgSrc;
		const imageSize = mapInfo[index].imgSize;
		const imageOption = mapInfo[index].imgPos;
		const markerImage = new kakao.maps.MarkerImage(
			imageSrc,
			imageSize,
			imageOption
		);

		const marker = new kakao.maps.Marker({
			position: markerPosition,
			image: markerImage,
		});

		marker.setMap(map_instance);
	}, [index]);

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

			<button onClick={() => setTraffic(!traffic)}>
				{traffic ? 'Traffic OFF' : 'Traffic ON'}
			</button>

			<ul>
				<li onClick={() => setIndex(0)}>삼성동 코엑스</li>
				<li onClick={() => setIndex(1)}>광화문 정문</li>
				<li onClick={() => setIndex(2)}>남산 타워</li>
			</ul>
		</Layout>
	);
}

export default Locaition;
