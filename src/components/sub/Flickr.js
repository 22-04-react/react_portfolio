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
		const method_user = 'flickr.people.getPhotos';
		let url = '';

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&user_id=${opt.user}`;
		}

		await axios.get(url).then((json) => {
			if (json.data.photos.photo.length === 0) {
				alert('해당 검색어의 이미지가 없습니다.');
				return;
			}
			setItems(json.data.photos.photo);
		});

		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setEnableClick(true);
		}, 1000);
	};

	const showSearch = () => {
		const result = input.current.value.trim();

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
		/*
		getFlickr({
			type: 'interest',
			count: 100,
		});
		*/

		getFlickr({
			type: 'user',
			count: 10,
			user: '164021883@N04',
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
							count: 100,
						});
					}
				}}>
				interest gallery
			</button>

			<div className='searchBox'>
				<input
					type='text'
					ref={input}
					onKeyUp={(e) => {
						if (e.key === 'Enter') showSearch();
					}}
				/>
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

									<div className='profile'>
										<img
											src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
											onError={(e) => {
												//만약 해당 이미지요소의 소스이미지가 없어서 error이벤트가 발생하면 src값을 setAttribute로 대체이미지를 대신 출력
												e.target.setAttribute(
													'src',
													'https://www.flickr.com/images/buddyicon.gif'
												);
											}}
										/>
										<span
											onClick={(e) => {
												if (enableClick) {
													setEnableClick(false);
													setLoading(true);
													frame.current.classList.remove('on');

													getFlickr({
														type: 'user',
														count: 100,
														user: e.currentTarget.innerText,
													});
												}
											}}>
											{item.owner}
										</span>
									</div>
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
