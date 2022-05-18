import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';
import { useState, useRef, useEffect } from 'react';
import SvgLine from '../../class/svg_line';

function Header(props) {
	const menu = useRef(null);
	const pathTop = useRef(null);
	const pathBottom = useRef(null);
	const active = { color: 'aqua' };
	const [toggle, setToggle] = useState(false);

	//강제 모바일패널 닫고 svg버튼 초기화 함수
	const closeMobile = () => {
		setToggle(false);

		const wid = window.innerWidth;
		if (wid > 1179) {
			menu.current.close();
			lineInit();
		}
	};

	//svg line 초기화 함수
	const lineInit = () => {
		SvgLine.put(pathTop.current, {
			start: '0%',
			end: '15%',
		});

		SvgLine.put(pathBottom.current, {
			start: '0%',
			end: '13%',
		});
	};

	//svg line 메뉴로 모양변형 함수
	const lineToMenu = () => {
		SvgLine.animate(pathTop.current, {
			start: '0%',
			end: '14%',
			duration: 0.5,
		});

		SvgLine.animate(pathBottom.current, {
			start: '0%',
			end: '13%',
			duration: 0.5,
			delay: 0.2,
		});
	};

	//svg line 닫기로 모양변형 함수
	const lineToClose = () => {
		SvgLine.animate(pathTop.current, {
			start: '80%',
			end: '100%',
			duration: 0.5,
		});
		SvgLine.animate(pathBottom.current, {
			start: '70%',
			end: '100%',
			duration: 0.5,
			delay: 0.2,
		});
	};

	//toggle값이 변경될때마다 svgLine과 패널 활성화
	useEffect(() => {
		if (toggle) {
			menu.current.open();
			lineToClose();
		} else {
			menu.current.close();
			lineToMenu();
		}
	}, [toggle]);

	//첨 컴포넌트 마운트시 svgLine초기화 및 closeMobile함수 윈도우 이벤트 연결
	useEffect(() => {
		lineInit();
		window.addEventListener('resize', closeMobile);
		return () => window.removeEventListener('resize', closeMobile);
	}, []);

	return (
		<>
			<header className={props.type}>
				<div className='inner'>
					<h1>
						<NavLink activeStyle={active} exact to='/'>
							LOGO
						</NavLink>
					</h1>

					<ul id='gnb'>
						<li>
							<NavLink activeStyle={active} to='/department'>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink activeStyle={active} to='/community'>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink activeStyle={active} to='/flickr'>
								Flickr
							</NavLink>
						</li>
						<li>
							<NavLink activeStyle={active} to='/youtube'>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink activeStyle={active} to='/location'>
								Location
							</NavLink>
						</li>
						<li>
							<NavLink activeStyle={active} to='/join'>
								Join
							</NavLink>
						</li>
					</ul>

					<a className='menuMo'>
						{/* <FontAwesomeIcon icon={faBars} onClick={() => setToggle(!toggle)} /> */}
						{/* 모바일호출 버튼 클릭할때마다 toggle값 변경 */}
						<span onClick={() => setToggle(!toggle)}>
							<svg width='80' height='80' viewBox='0 0 80 80' fill='none'>
								<path
									d='M16.5 1H55.5C61 3 72 9.8 72 21C72 35 65.5 56 36 56C6.5 56 0.5 36.5 0.5 21C0.5 8.6 11.1667 5.16667 16.5 5L55.5 37'
									transform='translate(5 20)'
									ref={pathTop}
								/>
								<path
									d='M16.5 56L55.5 56C61 54 72 47.2 72 36C72 22 65.5 0.999994 36 0.999997C6.5 0.999999 0.499997 20.5 0.499998 36C0.499999 48.4 11.1667 51.8333 16.5 52L55.5 20M16.5 56L55.5 56'
									transform='translate(5 5)'
									ref={pathBottom}
								/>
							</svg>
						</span>
					</a>
				</div>
			</header>

			<Menu ref={menu} toggle={toggle} setToggle={setToggle} />
		</>
	);
}

export default Header;
