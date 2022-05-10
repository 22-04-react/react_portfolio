import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	const [posts, setPosts] = useState(getLocalData());
	const [allowed, setAllowed] = useState(true);

	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			alert('제목과 본문을 입력하세요.');
			return;
		}

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
		setAllowed(false);
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	const disableUpdate = (index) => {
		setAllowed(true);
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	const updatePost = (index) => {
		if (!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
			alert('수정할 제목과 본문을 입력하세요.');
			return;
		}
		setAllowed(true);

		setPosts(
			posts.map((post, idx) => {
				if (idx === index) {
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(posts));
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
									<input
										type='text'
										defaultValue={post.title}
										ref={editInput}
									/>
									<br />
									<textarea
										ref={editTextarea}
										cols='30'
										rows='10'
										defaultValue={post.content}></textarea>

									<div className='btns'>
										<button onClick={() => disableUpdate(idx)}>cancel</button>
										<button onClick={() => updatePost(idx)}>save</button>
									</div>
								</>
							) : (
								//출력모드
								<>
									<h2>{post.title}</h2>
									<p>{post.content}</p>

									<div className='btns'>
										<button
											onClick={() => {
												if (allowed) enableUpdate(idx);
											}}>
											edit
										</button>
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
