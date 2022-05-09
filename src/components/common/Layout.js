import { useEffect, useRef } from 'react';

const path = process.env.PUBLIC_URL;

function Layout(props) {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.remove('on');
		frame.current.classList.add('on');
	}, []);

	return (
		<section className={`content ${props.name}`} ref={frame}>
			{/* prop으로 전달받은 bg 주소를 style객체에 담아서 인라인으로 배경처리 */}
			<figure style={{ backgroundImage: `url(${props.bg})` }}></figure>
			<div className='inner'>
				<h1>{props.name}</h1>
				{props.children}
			</div>
		</section>
	);
}

export default Layout;
