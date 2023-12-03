/** @format */

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const ViewProfile = () => {
	const searchParams = useSearchParams();
	const userId = searchParams.get('id');
	const name = searchParams.get('name');
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/user/${userId}/posts`);
			const data = await response.json();
			setPosts(data);
		};
		if (userId) {
			fetchPosts();
		}
	}, [userId]);
	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			'Are you sure you want to delete this prompt?'
		);
		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post?._id}`, {
					method: 'DELETE',
				});
				const filtered = posts?.filter((p) => p?._id !== post?._id);
				setPosts(filtered);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const handlEdit = async (post) => {
		router.push(`/update-prompt?id=${post?._id}`);
	};
	return (
		<Profile
			name={`${name} `}
			desc='Welcome to your personalized profile page'
			data={posts}
			handleEdit={handlEdit}
			handleDelete={handleDelete}
		/>
	);
};
export default ViewProfile;
