"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/libs/db";
import getSession from "@/libs/session";

export async function getUser() {
	const session = await getSession();
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
		});
		if (user) {
			return user;
		}
	}
	redirect("/log-in");
}

export async function getTweetCount() {
	const tweetCount = await db.tweet.count({});
	if (!tweetCount) return 0;
	return tweetCount;
}

export async function searchTweets(count: number, page: number) {
	const tweets = await db.tweet.findMany({
		select: {
			id: true,
			tweet: true,
			views: true,
			createdAt: true,
			user: {
				select: {
					username: true,
				},
			},
			_count: {
				select: {
					comments: true,
					likes: true,
				},
			},
		},
		skip: count * page,
		take: count,
		orderBy: {
			createdAt: "desc",
		},
	});
	if (!tweets) return [];
	return tweets;
}
