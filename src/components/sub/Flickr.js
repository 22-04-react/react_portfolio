import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';

function Flickr() {
	const { flickr } = useSelector((store) => store.flickrReducer);
	const dispatch = dispatch();
	const path = process.env.PUBLIC_URL;
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	//saga로 전달해서 api에 있는 axios함수에 인수로 전달한 객체가 담길 state생성
	const [opt, setOpt] = useState({ type: 'interest', count: 100 });
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = useState(0);
	const [enableClick, setEnableClick] = useState(true);
	const masonryOptions = { transitionDuration: '0.5s' };

	//데이터 호출후 로딩 처리할 함수 따로 분리
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

			//검색요청 함수 호출시
			//axios에 전달이 되야 되는 옵션객체를 setOpt로 스테이트 변경
			//해당 스테이트가 변경될때마다 useEffect로 saga.js에 전달됨
			setOpt({
				type: 'search',
				count: 100,
				tag: result,
			});

			endLoading();
		}
	};

	useEffect(() => {
		//의존성 배열을 opt로 해서 추후 setOpt를 통해서 axios로 전달되야 되는 옵션객체값이 변경될때마다
		//액션객체로 변환되서 dispatch로 saga.js로 전달
		dispatch({ type: 'FLICKR_START', opt });
		//데이터 전달후 로딩처리하는 함수 호출
		endLoading();
	}, [opt]);

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
							endLoading();
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

														//유저 아이디 클릭시
														//axios에 전달이 되야 되는 옵션객체를 setOpt로 스테이트 변경
														//해당 스테이트가 변경될때마다 useEffect로 saga.js에 전달됨
														setOpt({
															type: 'user',
															count: 100,
															user: e.currentTarget.innerText,
														});

														endLoading();
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
