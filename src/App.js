import { Route } from 'react-router-dom';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Visual from './components/main/Visual';
import Content from './components/main/Content';

//sub
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';

function App() {
	return (
		<>
			<Header />

			<Route exact path='/'>
				<Visual />
				<Content />
			</Route>

			<Route path='/department'>
				<Department />
			</Route>

			<Route path='/gallery'>
				<Gallery />
			</Route>

			<Footer />
		</>
	);
}

export default App;
