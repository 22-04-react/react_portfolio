import Layout from '../common/Layout';
import { useEffect } from 'react';

function Department() {
	useEffect(() => {
		console.log('department생성');

		return () => {
			console.log('department소멸');
		};
	}, []);

	return (
		<Layout name={'Department'}>
			<p>디파트먼트 컴포넌트 상세페이지</p>
		</Layout>
	);
}

export default Department;
