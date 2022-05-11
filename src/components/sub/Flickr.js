import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';

function Flickr() {
	const path = process.env.PUBLIC_URL;
	const frame = useRef(null);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	const masonryOptions = {
		transitionDuration: '0.5s',
	};

	const key = '4612601b324a2fe5a1f5f7402bf8d87a';
	const num = 50;
	const interest_url = `https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
	const search_url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&tags=ocean`;

	const getFlickr = async (url) => {
		await axios.get(url).then((json) => {
			setItems(json.data.photos.photo);
		});

		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
		}, 1000);
	};

	useEffect(() => {
		getFlickr(interest_url);
	}, []);

	return (
		<Layout name={'Flickr'}>
			{loading ? (
				<img className='loading' src={path + '/img/loading.gif'} />
			) : null}
			<button
				onClick={() => {
					setLoading(true);
					frame.current.classList.remove('on');
					getFlickr(interest_url);
				}}>
				interest gallery
			</button>

			<button
				onClick={() => {
					setLoading(true);
					frame.current.classList.remove('on');
					getFlickr(search_url);
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
