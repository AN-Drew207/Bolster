import { createContext } from 'react';

export type LoadGooglePlaceAPIType = boolean;

interface LoadGooglePlaceAPIContextInterface {
	onLoadGooglePlaceAPI: LoadGooglePlaceAPIType;
	setOnLoadGooglePlaceAPI:
		| React.Dispatch<React.SetStateAction<LoadGooglePlaceAPIType>>
		| ((value: LoadGooglePlaceAPIType) => void);
}

export const GooglePlaceAPIContext =
	createContext<LoadGooglePlaceAPIContextInterface>({
		onLoadGooglePlaceAPI: false,
		setOnLoadGooglePlaceAPI: () => null,
	});
