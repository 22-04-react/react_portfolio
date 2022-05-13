import { useSelector } from 'react-redux';

function Vids() {
	const vidData = useSelector((store) => store.youtubeReducer.youtube);

	return (
		<section id='vids' className='myScroll'>
			<h2>Recent Youtube</h2>
			<ul>
				{vidData.map((vid, idx) => {
					if (idx < 3) {
						return (
							<li key={idx}>
								<img src={vid.snippet.thumbnails.medium.url} />
							</li>
						);
					}
				})}
			</ul>
		</section>
	);
}

export default Vids;
