import { forwardRef, useState, useImperativeHandle } from 'react';

const Popup = forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);

	//해당 컴포넌트를 forwardRef로 감싸서
	//useImperativeHandle로 state변경함수를 내보냄
	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	return (
		<>
			{open && (
				<aside className='pop'>
					<div className='con'>{props.children}</div>
				</aside>
			)}
		</>
	);
});

export default Popup;
