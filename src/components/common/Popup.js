import { forwardRef, useState, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	return (
		//해당 컴포넌트가 사라질때에도 모션처리가 가능하게 설정
		<AnimatePresence>
			{open && (
				<motion.aside
					className='pop'
					initial={{ opacity: 0, scale: 0 }} //초기상태
					animate={{ opacity: 1, scale: 1 }} //해당 컴포넌트가 생성될떄 실행될 값
					exit={{ opacity: 0, scale: 0 }} //해당 컴포넌트가 소멸될때 실행될 값
				>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.5 } }} //aside모션이 끝나는 순간인 0.5초 이후에 con fadeIn처리
						exit={{ opacity: 0 }}>
						{props.children}
					</motion.div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Popup;
