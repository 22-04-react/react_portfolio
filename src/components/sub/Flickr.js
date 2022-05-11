import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Flickr() {
	const frame = useRef(null);
	const [items, setItems] = useState([]);

	//wrapping함수에 async키워드를 추가하고
	const getFlickr = async () => {
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const method_interest = 'flickr.interestingness.getList';
		const num = 500;
		const url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;

		//순차적으로 동작이 되야 되는 함수에 await 키워드 추가
		await axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});

		//다음 코드들은 위의 await구문이 붙어있는 코드의 동작이 완료된 직후에 동기적으로 실행됨
		//결과적으로 모든 데이터가 flickr로 부터 다 불러와져야지 갤러리 출력됨
		console.log('flickr데이터 호출끝!! 화면 출력시작');
		frame.current.classList.add('on');
	};

	useEffect(() => {
		getFlickr();
	}, []);

	return (
		<Layout name={'Flickr'}>
			<div className='frame' ref={frame}>
				{items.map((item, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
									/>
								</div>
								<h2>{item.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Flickr;
