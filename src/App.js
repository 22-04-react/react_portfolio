import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Main from './components/main/Main';

//sub
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Flickr from './components/sub/Flickr';
import './scss/style.scss';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		//플리커 액션 객체를 saga.js에 전달
		dispatch({
			type: 'FLICKR_START',
			opt: { type: 'user', count: 100, user: '164021883@N04' },
		});

		//유튜브 액션 객체를 saga.js에 전달
		dispatch({ type: 'YOUTUBE_START' });

		//멤버 액션 객체를 sgag.js에 전달
		dispatch({ type: 'MEMBER_START' });
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/flickr' component={Flickr} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/join' component={Join} />

			<Footer />
		</>
	);
}

export default App;
