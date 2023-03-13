"use client";

export default function Error({ error, reset }) {
	return (
		<div>
			This is not loading up: {error.message}
			<button onClick={() => reset()}></button>
		</div>
	);
}
