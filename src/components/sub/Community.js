import Layout from '../common/Layout';
import { useRef, useState } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);

	const dummyPosts = [
		{ title: 'Hello2', content: 'Here comes description in detail.' },
		{ title: 'Hello1', content: 'Here comes description in detail.' },
	];

	const [posts, setPosts] = useState(dummyPosts);

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

				<button>cancel</button>
				<button>create</button>
			</div>

			<div className='showBox'>
				{posts.map((post, idx) => {
					return (
						<article key={idx}>
							<h2>{post.title}</h2>
							<p>{post.content}</p>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
