import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setYoutube, setMembers, setGallery } from './redux/action';
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

const path = process.env.PUBLIC_URL;

function App() {
	const dispatch = useDispatch();

	const fetchMembers = async () => {
		const url = path + '/DB/member.json';
		await axios.get(url).then((json) => {
			dispatch(setMembers(json.data.members));
		});
	};
	const fetchGallery = async () => {
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const method_interest = 'flickr.interestingness.getList';
		const num = 20;
		const url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;

		await axios.get(url).then((json) => {
			dispatch(setGallery(json.data.photos.photo));
		});
	};

	useEffect(() => {
		dispatch({
			type: 'FLICKR_START',
			opt: { type: 'user', count: 100, user: '164021883@N04' },
		});
		//유튜브 액션 객체를 saga.js에 전달
		dispatch({ type: 'YOUTUBE_START' });
		fetchMembers();
		fetchGallery();
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
