/** @format */
'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
const CreatePrompt = () => {
	const router = useRouter();
	const { data: sesssion } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});
	const createPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					prompt: post?.prompt,
					userId: sesssion?.user?.id,
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
	return (
		<Form
			type='Create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
