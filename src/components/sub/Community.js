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

	const enableUpdate = (index) => {
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	//다시 출력모드로 변경하는 함수
	const disableUpdate = (index) => {
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

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
							{post.enableUpdate ? (
								//수정모드
								<>
									<input type='text' defaultValue={post.title} />
									<br />
									<textarea
										cols='30'
										rows='10'
										defaultValue={post.content}></textarea>

									<div className='btns'>
										<button onClick={() => disableUpdate(idx)}>cancel</button>
										<button>save</button>
									</div>
								</>
							) : (
								//출력모드
								<>
									<h2>{post.title}</h2>
									<p>{post.content}</p>

									<div className='btns'>
										<button onClick={() => enableUpdate(idx)}>edit</button>
										<button onClick={() => deletePost(idx)}>delete</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
