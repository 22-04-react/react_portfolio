import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
const path = process.env.PUBLIC_URL;

function Department() {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		axios.get(`${path}/DB/member.json`).then((json) => {
			console.log(json.data.members);
			setMembers(json.data.members);
			console.log(members);
		});
	}, []);

	return (
		<Layout name={'Department'}>
			<ul className='memberList'>
				{members.map((member, idx) => {
					return (
						<li key={idx}>
							<h2>{member.name}</h2>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Department;
