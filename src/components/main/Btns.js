function Btns(props) {
	return (
		<ul className='scroll_navi'>
			<li className='on' onClick={() => props.setIndex(0)}></li>
			<li onClick={() => props.setIndex(1)}></li>
			<li onClick={() => props.setIndex(2)}></li>
			<li onClick={() => props.setIndex(3)}></li>
		</ul>
	);
}

export default Btns;
