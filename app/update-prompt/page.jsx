/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
const EditPrompt = () => {
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});
	const UpdatePrompt = async (e) => {
		if (!promptId) return alert('Prompt ID not found!');
		e.preventDefault();
		setSubmitting(true);
		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: post?.prompt,
					tag: post?.tag,
				}),
			});
			setSubmitting(false);
			if (response?.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
			setSubmitting(false);
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		const getPrompDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response?.json();
			setPost({
				prompt: data?.prompt,
				tag: data?.tag,
			});
		};
		if (promptId) getPrompDetails();
	}, [promptId]);
	return (
		<Form
			type='Edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={UpdatePrompt}
		/>
	);
};

export default EditPrompt;
