import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';
import { useState, useRef, useEffect } from 'react';
import SvgLine from '../../class/svg_line';

function Header(props) {
	const menu = useRef(null);
	const pathTop = useRef(null);
	const active = { color: 'aqua' };
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		toggle ? menu.current.open() : menu.current.close();
	}, [toggle]);

	useEffect(() => {
		SvgLine.put(pathTop.current, {
			start: '0%',
			end: '13%',
		});
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
						<span
							onClick={() => {
								setToggle(!toggle);
								SvgLine.animate(pathTop.current, {
									start: '0%',
									end: '13%',
									duration: 0.5,
								});
								if (toggle) {
								} else {
									SvgLine.animate(pathTop.current, {
										start: '80%',
										end: '100%',
										duration: 0.5,
									});
								}
							}}>
							<svg width='80' height='80' viewBox='0 0 80 80' fill='none'>
								<path
									d='M16.5 1H55.5C61 3 72 9.8 72 21C72 35 65.5 56 36 56C6.5 56 0.5 36.5 0.5 21C0.5 8.6 11.1667 5.16667 16.5 5L55.5 37'
									transform='translate(5 20)'
									id='pathTop'
									ref={pathTop}
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
