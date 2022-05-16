import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';

function Flickr() {
	const { flickr } = useSelector((store) => store.flickrReducer);
	const dispatch = useDispatch();
	const path = process.env.PUBLIC_URL;
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	const [opt, setOpt] = useState({ type: 'interest', count: 100 });
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = useState(0);
	const [enableClick, setEnableClick] = useState(true);
	const masonryOptions = { transitionDuration: '0.5s' };

	const endLoading = () => {
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

			setOpt({
				type: 'search',
				count: 100,
				tag: result,
			});
		}
	};

	useEffect(() => {
		dispatch({ type: 'FLICKR_START', opt });
	}, [opt]);

	useEffect(() => {
		//기존의 endLoading함수를 api요청을 할때 실행하는게 아닌
		//store를 통해 데이터호출이 완료될때마다 실행
		//이때 처음 flickr값은 빈 배열이 들어오니 그때만 조건문으로 실행되지 않도록 처리
		if (flickr.length !== 0) endLoading();
	}, [flickr]);

	return (
		<>
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

							setOpt({
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
						{flickr.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												pop.current.open();
											}}>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
											/>
										</div>
										<h2>{item.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												onError={(e) => {
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

														setOpt({
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

			<Popup ref={pop}>
				{flickr.length !== 0 ? (
					<>
						<img
							src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`}
						/>
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				) : null}
			</Popup>
		</>
	);
}

export default Flickr;
