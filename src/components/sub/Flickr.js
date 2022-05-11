import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';

function Flickr() {
	const path = process.env.PUBLIC_URL;
	const frame = useRef(null);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [enableClick, setEnableClick] = useState(true);

	const masonryOptions = {
		transitionDuration: '0.5s',
	};

	const getFlickr = async (opt) => {
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const num = opt.count;
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		let url = '';

		//인수로 받은 객체의 type이 interest면 interest url반환
		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
		}
		//인수로 받은 객체의 type이 search면 tags를 받아 해당 검색어의 데이터를 불러오는 url반환
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

	useEffect(() => {
		getFlickr({
			type: 'interest',
			count: 500,
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

			<button
				onClick={() => {
					if (enableClick) {
						setEnableClick(false);
						setLoading(true);
						frame.current.classList.remove('on');

						getFlickr({
							type: 'search',
							count: 500,
							tags: 'spring',
						});
					}
				}}>
				search gallery
			</button>

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
