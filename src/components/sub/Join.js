import Layout from '../common/Layout';
import { useState } from 'react';

function Join() {
	const initVal = {
		userid: '',
	};

	const [val, setVal] = useState(initVal);

	const handleChange = (e) => {
		//순서2 - 입력하고 있는 input요소의 name, value값을 변수로 비구조할당
		const { name, value } = e.target;

		//setVal({ ...val, userid: value });
		//순서3 - 기존 val값을 복사해서 방급 입력받은 value값으로 덮어쓰기
		setVal({ ...val, [name]: value });
	};

	return (
		<Layout name={'Join'}>
			<form>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1'>
						<caption>회원가입 정보입력</caption>
						<tbody>
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										id='userid'
										name='userid'
										placeholder='아이디를 입력하세요'
										//val스테이트의 userid값이 인풋요소에 출력
										value={val.userid}
										//순서1- 인풋에 값을 입력하면 handleChange함수 호출
										onChange={handleChange}
									/>
								</td>
							</tr>
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' />
									<input type='submit' value='SEND' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Join;
