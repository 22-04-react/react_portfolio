import { forwardRef, useState, useImperativeHandle } from 'react';

//단계1 - 기존의 컴포넌트 함수를 대입형함수로(화살표함수)로 변경하고
//단계2 - 해당 화살표 함수를 forwardRef()함수로 wrapping
//단계3 - forwardRef의 두번째 인수로 ref추가
const Popup = forwardRef((props, ref) => {
	//자신의 open여부를 결정하는 state생성
	const [open, setOpen] = useState(false);

	//해당 컴포넌트에서 만들어지는 함수를 부모컴포넌트에서 사용가능하도록 외부로 반환가능
	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true), //팝업여는 기능
			close: () => setOpen(false), //팝업닫는 기능
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
