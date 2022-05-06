import Layout from '../common/Layout';
import { useEffect } from 'react';
import axios from 'axios';

const path = process.env.PUBLIC_URL;

function Department() {
	useEffect(() => {
		axios
			.get(`${path}/DB/member.json`)
			.then((json) => console.log(json.data.members));
	}, []);

	return <Layout name={'Department'}></Layout>;
}

export default Department;
