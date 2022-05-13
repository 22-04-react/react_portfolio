import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setYoutube } from './redux/action';
import axios from 'axios';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Main from './components/main/Main';

//sub
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Flickr from './components/sub/Flickr';

import './scss/style.scss';

function App() {
	//루트 컴포넌트인 App에서 youtube data를 가져와서 전역 store에 저장하는 함수
	const dispatch = useDispatch();
	const fetchYoutube = async () => {
		const key = 'AIzaSyBZFBuapkASPcRBXB2-d_ak5-ecCpVicI4';
		const playlistId = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
		const num = 5;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

		await axios.get(url).then((json) => {
			dispatch(setYoutube(json.data.items));
		});
	};

	//해당 루트 컴포넌트가 마운트 되면 stroe에 데이터 저장
	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/flickr' component={Flickr} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/join' component={Join} />

			<Footer />
		</>
	);
}

export default App;
