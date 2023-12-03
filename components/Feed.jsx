/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PrompCardList = ({ data, handClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data?.map((post) => {
				return (
					<PromptCard
						key={post?._id}
						post={post}
						handleTagClick={(val) => handClick(val)}
					/>
				);
			})}
		</div>
	);
};
const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);
	const handleSearchChange = (e) => {
		setSearchText(e?.target?.value);
	};
	const fetchPosts = async (api) => {
		const response = await fetch(api);
		const data = await response.json();
		setPosts(data);
	};
	useEffect(() => {
		fetchPosts('/api/prompt');
	}, []);
	useEffect(() => {
		setTimeout(async () => {
			fetchPosts(`/api/prompt?search=${searchText}`);
		}, 300);
	}, [searchText]);
	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='search'
					placeholder='Search for a tag or a username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>
			<PrompCardList
				data={posts}
				handClick={(val) => setSearchText(val)}
			/>
		</section>
	);
};

export default Feed;
