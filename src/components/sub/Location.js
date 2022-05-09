import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

function Locaition() {
	//window전역에서 kakao라는 이름으로 등록되어 있는 객체를 비구조할당으로 직접 변수에 할당
	const { kakao } = window;
	const container = useRef(null);
	const options = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	useEffect(() => {
		const map = new kakao.maps.Map(container.current, options);
	}, []);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Locaition;
