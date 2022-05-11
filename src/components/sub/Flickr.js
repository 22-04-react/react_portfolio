import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Flickr() {
	const frame = useRef(null);
	const [items, setItems] = useState([]);

	const key = '4612601b324a2fe5a1f5f7402bf8d87a';
	const num = 50;
	const interest_url = `https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
	const search_url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&tags=ocean`;

	//getFlickr함수에 원하는 주소값을 전달할 수 있도록 url이라는 파라미터 추가
	const getFlickr = async (url) => {
		await axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});

		frame.current.classList.add('on');
	};

	useEffect(() => {
		//처음 컴포넌트 로딩시 interest 인수로 해당 갤러리 화면 출력
		getFlickr(interest_url);
	}, []);

	return (
		<Layout name={'Flickr'}>
			{/* 버튼 클릭시 frame에 on을 지워서 기존 갤러리 사라지게 하고 interest갤러리 호출 */}
			<button
				onClick={() => {
					frame.current.classList.remove('on');
					getFlickr(interest_url);
				}}>
				interest gallery
			</button>

			{/* 버튼 클릭시 frame에 on을 지워서 기존 갤러리 사라지게 하고 search갤러리 호출 */}
			<button
				onClick={() => {
					frame.current.classList.remove('on');
					getFlickr(search_url);
				}}>
				search gallery
			</button>

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
