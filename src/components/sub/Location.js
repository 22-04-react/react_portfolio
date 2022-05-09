import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

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
		const map = new kakao.maps.Map(container.current, options);
		setMap(map);
	}, []);

	useEffect(() => {
		// 처음 mount시 map값이 비어있어서 오류나는걸 해결하기 위해
		// map값이 담겨있을때에만 구문실행되도록 조건문 설정
		if (map) {
			traffic
				? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
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
