function Btns(props) {
	console.log(props);
	return (
		<ul className='scroll_navi'>
			{props.num.map((_, idx) => (
				<li key={idx} onClick={() => props.setIndex(idx)}></li>
			))}
		</ul>
	);
}

export default Btns;
