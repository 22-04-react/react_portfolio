import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Btns from './Btns';
import Anime from '../../class/anime.js';

function Main() {
	return (
		<>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics />
			<Vids />
			<Btns />
		</>
	);
}

export default Main;
