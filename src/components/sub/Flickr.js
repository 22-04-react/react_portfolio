import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';

function Flickr() {
	const path = process.env.PUBLIC_URL;
	const frame = useRef(null);
	const input = useRef(null);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [enableClick, setEnableClick] = useState(true);
	const masonryOptions = { transitionDuration: '0.5s' };

	const getFlickr = async (opt) => {
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const num = opt.count;
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		let url = '';

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}

		await axios.get(url).then((json) => {
			setItems(json.data.photos.photo);
		});

		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setEnableClick(true);
		}, 1000);
	};

	const showSearch = (e) => {
		const result = input.current.value.trim();

		//입력된 키보드 값이 엔터가 아니면 함수 종료
		if (e.key !== 'Enter') return;

		//입력된 검색어가 없으면 경고창 띄우고 종료
		if (!result) {
			alert('검색어를 입력하세요');
			return;
		}

		input.current.value = '';

		if (enableClick) {
			setEnableClick(false);
			setLoading(true);
			frame.current.classList.remove('on');

			getFlickr({
				type: 'search',
				count: 100,
				tags: result,
			});
		}
	};

	useEffect(() => {
		getFlickr({
			type: 'interest',
			count: 100,
		});
	}, []);

	return (
		<Layout name={'Flickr'}>
			{loading ? (
				<img className='loading' src={path + '/img/loading.gif'} />
			) : null}
			<button
				onClick={() => {
					if (enableClick) {
						setEnableClick(false);
						setLoading(true);
						frame.current.classList.remove('on');

						getFlickr({
							type: 'interest',
							count: 500,
						});
					}
				}}>
				interest gallery
			</button>

			<div className='searchBox'>
				<input type='text' ref={input} onKeyUp={showSearch} />
				<button onClick={showSearch}>search</button>
			</div>

			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={masonryOptions}>
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
				</Masonry>
			</div>
		</Layout>
	);
}

export default Flickr;

/*
	keyDown (키를 누르는 순간) 
	keyUp, (키를 눌렀다 떼는 순간)
	keyPress (키를 눌렀다 떼는 순간, 특수키가 안먹음)
*/
