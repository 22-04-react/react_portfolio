import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);

	const dummyPosts = [
		{ title: 'Hello5', content: 'Here comes description in detail.' },
		{ title: 'Hello4', content: 'Here comes description in detail.' },
		{ title: 'Hello3', content: 'Here comes description in detail.' },
		{ title: 'Hello2', content: 'Here comes description in detail.' },
		{ title: 'Hello1', content: 'Here comes description in detail.' },
	];

	const [posts, setPosts] = useState(dummyPosts);

	const createPost = () => {
		setPosts([
			{ title: input.current.value, content: textarea.current.value },
			...posts,
		]);
		resetPost();
	};

	const resetPost = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const deletePost = (index) => {
		setPosts(posts.filter((_, idx) => idx !== index));
	};

	//수정버튼 클릭시 실행되는 함수
	//클릭한 버튼의 포스트 순번을 파라미터로 전달
	const enableUpdate = (index) => {
		setPosts(
			//기존 배열값을 반복돌면서 인수로 전달된 순번과 현재 반복도는 순번이 같은 포스트만 찾아서
			//enableUpdate:true라는 값을 추가한뒤 setPosts로 기존 state값 변경
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	//posts 값이 변경될때마다 콘솔로 출력
	useEffect(() => {
		console.log(posts);
	}, [posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea
					ref={textarea}
					cols='30'
					rows='10'
					placeholder='본문을 입력하세요'></textarea>
				<br />

				<button onClick={resetPost}>cancel</button>
				<button onClick={createPost}>create</button>
			</div>

			<div className='showBox'>
				{posts.map((post, idx) => {
					return (
						<article key={idx}>
							<h2>{post.title}</h2>
							<p>{post.content}</p>

							<div className='btns'>
								{/* 수정 버튼 클릭시 enableUpdate호출하면서 인수로 수정할 post순번 전달 */}
								<button onClick={() => enableUpdate(idx)}>edit</button>
								<button onClick={() => deletePost(idx)}>delete</button>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
