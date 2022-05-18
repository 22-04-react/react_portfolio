import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';
import { useState, useRef, useEffect } from 'react';

function Header(props) {
	const menu = useRef(null);
	const active = { color: 'aqua' };
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		toggle ? menu.current.open() : menu.current.close();
	}, [toggle]);

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
						<span onClick={() => setToggle(!toggle)}>
							<svg width='202' height='154' viewBox='0 0 202 154'>
								<path
									d='M51.5 0.5H152C168.833 2.33333 202.2 15.3 201 52.5C199.5 99 192 153 105 152.5C18 152 -0.999973 119.5 1.00003 52.5C2.60003 -1.1 33 6.83333 48 17.5L152 83'
									stroke='black'
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
