import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
const path = process.env.PUBLIC_URL;

function Department() {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		axios.get(`${path}/DB/member.json`).then((json) => {
			setMembers(json.data.members);
		});
	}, []);

	return (
		// public폴더까지의 절대 경로값으로 이미지 url을 prop으로 전달
		<Layout name={'Department'} bg={`${path}/img/member1.jpg`}>
			<button
				onClick={() => {
					const newMembers = [...members];
					newMembers[0].name = 'Emma';
					setMembers(newMembers);
				}}>
				정보변경
			</button>

			<ul className='memberList'>
				{members.map((member, idx) => {
					return (
						<li key={idx}>
							<div className='inner'>
								<img src={`${path}/img/${member.pic}`} />
								<h2>{member.name}</h2>
								<p>{member.position}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Department;
