<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { formData } from 'zod-form-data';

	const { data } = $props();
	const { userProfile } = data;

	$inspect(userProfile);

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');

	$effect(() => {
		if (userProfile) {
			firstName = userProfile.firstName;
			lastName = userProfile.lastName;
			email = userProfile.email;
		}
	});
</script>

{#if userProfile}
	<Card>
		<CardHeader>Manage your profile</CardHeader>
		<CardContent>
			<form
				method="post"
				use:enhance={({ formData }) => {
					formData.set('firstName', firstName);
					formData.set('lastName', lastName);
					formData.set('email', email);

					return ({ result }) => {
						if (result.type === 'success') {
							invalidate('/');
							alert('Profile updated');
						} else {
							alert('Something went wrong');
						}
					};
				}}
			>
				<div>
					<Label>Email</Label>
					<Input bind:value={email} />
				</div>
				<div>
					<Label>First Name</Label>
					<Input bind:value={firstName} />
				</div>
				<div>
					<Label>Last Name</Label>
					<Input bind:value={lastName} />
				</div>
				<div>
					<Button type="submit">Update</Button>
				</div>
			</form>
		</CardContent>
	</Card>

    <Button href="/auth/logout">Logout</Button>
{:else}
	<Button href="/auth/login">Login to the site</Button>
{/if}
