import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Join() {
	const initVal = {
		userid: '',
		email: '',
	};

	const [val, setVal] = useState(initVal);
	const [err, setErr] = useState({});

	//순서4- 인수로 전달된 값으로 인증체크시작
	const check = (val) => {
		const errs = {};

		//순서5- 현재 val값의 userid값이 인증통과 안되면
		//에러객체에 에러문구 담아서 반환
		if (val.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...val, [name]: value });
	};

	//순서2 - 해당함수가 호출되면
	const handleSubmit = (e) => {
		e.preventDefault();
		//순서3- 현재의 value값을 check함수의 인수로 전달
		setErr(check(val));
		//순서6 - check함수를 통해서 반환된 err객체를 setErr로 err스테이트에 옮겨담음
	};

	useEffect(() => {
		console.log(err);
	}, [err]);

	return (
		<Layout name={'Join'}>
			{/* 순서1- 전송버튼 눌러서 submit이벤트 발생시 handleSubmit호출 */}
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1'>
						<caption>회원가입 정보입력</caption>
						<tbody>
							{/* user id */}
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
										value={val.userid}
										onChange={handleChange}
									/>
								</td>
							</tr>

							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										placeholder='이메일주소를 입력하세요'
										value={val.email}
										onChange={handleChange}
									/>
								</td>
							</tr>

							{/* button set */}
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
