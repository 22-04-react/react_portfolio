import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';
import { useSelector } from 'react-redux';

function Youtube() {
	const vidData = useSelector((store) => store.youtubeReducer.youtube);
	const pop = useRef(null);
	const [index, setIndex] = useState(0);

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
