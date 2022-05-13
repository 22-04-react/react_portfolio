import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Popup from '../common/Popup';
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from '../../redux/action';

function Youtube() {
	//store에서 youtubeReducer 데이터를 가져옴 (빈배열)
	const vidData = useSelector((store) => store.youtubeReducer.youtube);
	console.log(vidData);

	//액션객체를 reducer로 전달해주는 함수 할당
	const dispatch = useDispatch();
	const pop = useRef(null);
	const [index, setIndex] = useState(0);

	const fetchYoutube = async () => {
		const key = 'AIzaSyBZFBuapkASPcRBXB2-d_ak5-ecCpVicI4';
		const playlistId = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
		const num = 5;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

		await axios.get(url).then((json) => {
			//axios로 받아온 데이터를 setYoutube로 함수로 action객체를 반환하고
			//반환된 action객체를 dispatch로 reducer에 전달
			dispatch(setYoutube(json.data.items));
		});
	};

	useEffect(() => {
		//해당 함수가 실행되면 axios가 받아진 데이타가 reducer로 전달되서
		//전역 store에 담기고
		//다시 store를 통해서 화면 랜더링
		fetchYoutube();
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				{vidData.map((vid, idx) => {
					const tit = vid.snippet.title;
					const desc = vid.snippet.description;
					const date = vid.snippet.publishedAt;

					return (
						<article
							key={idx}
							onClick={() => {
								pop.current.open();
								setIndex(idx);
							}}>
							<div className='pic'>
								<img src={vid.snippet.thumbnails.standard.url} />
							</div>
							<h2>{tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
							<p>{desc.length > 150 ? desc.substr(0, 150) + '...' : desc}</p>
							<span>{date.split('T')[0]}</span>
						</article>
					);
				})}
			</Layout>

			<Popup ref={pop}>
				{vidData.length !== 0 ? (
					<>
						<iframe
							src={`https://www.youtube.com/embed/${vidData[index].snippet.resourceId.videoId}`}
							frameBorder='0'></iframe>
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				) : null}
			</Popup>
		</>
	);
}

export default Youtube;
