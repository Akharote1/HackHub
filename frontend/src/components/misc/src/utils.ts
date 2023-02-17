import moment, { Moment } from 'moment';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './services/firebase';
import path from 'path';

export function sentenceCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1);
	});
}

export function getUserAvatar(name, size = 128, user = null) {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(
		name
	)}&background=random&size=${size}`;
}

export function parseDateTime(str: string): Moment {
	return moment(str, 'MM/DD/YY HH:mm');
}

export function formatDateTime(date: Moment): string {
	return date.format('MM/DD/YY HH:mm');
}

export async function uploadFilesToCloud(arr: File[], directory: string) {
	if (arr.length == 0) return [];

	const outputURLs = [];

	const uploadSingleFile = async (file: File) => {
		const fileRef = ref(
			storage,
			path.join(directory, 'img_' + Date.now() + '_' + file.name)
		);
		const result = await uploadBytes(fileRef, file);
		const downloadURL = await getDownloadURL(result.ref);
		outputURLs.push(downloadURL);
	};

	await Promise.all(arr.map(uploadSingleFile));

	return outputURLs;
}