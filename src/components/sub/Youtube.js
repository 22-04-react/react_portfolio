import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Popup from '../common/Popup';

function Youtube() {
	const pop = useRef(null);
	const [vids, setVids] = useState([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const key = 'AIzaSyBZFBuapkASPcRBXB2-d_ak5-ecCpVicI4';
		const playlistId = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
		const num = 5;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

		axios.get(url).then((json) => {
			console.log(json.data.items);
			setVids(json.data.items);
		});
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				{vids.map((vid, idx) => {
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
				{vids.length !== 0 ? (
					<>
						<iframe
							src={`https://www.youtube.com/embed/${vids[index].snippet.resourceId.videoId}`}
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

/*
	e.target은 이벤트구문에서의 연결된 선택자가 아닌 실제 화면상에서 이벤트가 발생한 대상을 지칭
	e.currentTarget은 이벤트 구문에서의 연결된 선택자를 지칭
*/
