import { NavLink } from 'react-router-dom';
import { forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = forwardRef((props, ref) => {
	const [open, setOpen] = useState(true);

	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	return (
		<AnimatePresence>
			{open && (
				<nav>
					<h1>
						<NavLink exact to='/'>
							LOGO
						</NavLink>
					</h1>

					<ul id='gnb'>
						<li>
							<NavLink to='/department'>Department</NavLink>
						</li>
						<li>
							<NavLink to='/community'>Commnunity</NavLink>
						</li>
						<li>
							<NavLink to='/flickr'>Flickr</NavLink>
						</li>
						<li>
							<NavLink to='/youtube'>Youtube</NavLink>
						</li>
						<li>
							<NavLink to='/location'>Location</NavLink>
						</li>
						<li>
							<NavLink to='/join'>Join</NavLink>
						</li>
					</ul>
				</nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
