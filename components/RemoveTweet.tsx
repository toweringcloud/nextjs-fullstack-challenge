"use client";

import { useFormState } from "react-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function RemoveTweet({ action, tweetId }: any) {
	const [state, dispatch] = useFormState(action, null);

	return (
		<form action={dispatch} className="flex flex-col">
			<input name="tweetId" value={tweetId} required type="hidden" />
			<button>
				<TrashIcon className="size-4 text-orange-500 -mt-1" />
			</button>
		</form>
	);
}
