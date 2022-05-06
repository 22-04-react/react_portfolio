import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../common/Popup';

function Youtube() {
	const [vids, setVids] = useState([]);
	const [open, setOpen] = useState(false);
	//리스트의 순서를 다룰 state추가
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
							//article클릭시 클릭한 요소의 순서값인 idx값을 setIndex를 이용하여 index state값 변경
							onClick={() => {
								setOpen(true);
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

			{open ? (
				<Popup setOpen={setOpen}>
					<iframe
						//팝업이 호출될때 변경된 index순번의 vids state값의 데이터값이 팝업영상으로 출력
						src={`https://www.youtube.com/embed/${vids[index].snippet.resourceId.videoId}`}
						frameBorder='0'></iframe>
				</Popup>
			) : null}
		</>
	);
}

export default Youtube;
