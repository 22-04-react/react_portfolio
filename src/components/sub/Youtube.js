import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Youtube() {
	const [vids, setVids] = useState([]);
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
		<Layout name={'Youtube'}>
			{vids.map((vid, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img src={vid.snippet.thumbnails.standard.url} />
							<h2>{vid.snippet.title}</h2>
							<p>{vid.snippet.description}</p>
							<span>{vid.snippet.publishedAt}</span>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

export default Youtube;
