import { Route } from 'react-router-dom';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Visual from './components/main/Visual';
import Content from './components/main/Content';

//sub
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';

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

			<Route path='/community'>
				<Community />
			</Route>

			<Route path='/gallery'>
				<Gallery />
			</Route>

			<Route path='/youtube'>
				<Youtube />
			</Route>

			<Route path='/location'>
				<Location />
			</Route>

			<Route path='/join'>
				<Join />
			</Route>

			<Footer />
		</>
	);
}

export default App;

/*
	SSR vs CSR
	SSR (Server Side Rendering)
	- 페이지 이동할때마다 일일이 서버쯕에 출력될 html파일을 요청
	- 장점 - 초기 로딩속도가 빠름, 검색최적화 SEO
	- 단점 - 페이지 이동시, 같은 페이지안에서 컨텐츠가 동적으로 바꿔야될때 사용성 낮음

	CSR (Client Side Rendering)
	- 초기에 화면에 출력될 모든 정보 데이터를 chunk단위로 모두 불러옴
	- 장점 - 같은 페이지안에서 서로 다른 컨텐츠를 실시간으로 변경하면서 출력하므로 사용성이 좋음
	- 단점 - 초기 로딩속도가 느림, 검색엔진 비최적화
*/
