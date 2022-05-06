import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
	useEffect(() => {
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const method_interest = 'flickr.interestingness.getList';
		const num = 5;
		const url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
		axios.get(url).then((json) => console.log(json.data.photos.photo));
	}, []);

	return (
		<Layout name={'Gallery'}>
			<p>갤러리 컨텐츠가 들어올자리</p>
		</Layout>
	);
}

export default Gallery;
