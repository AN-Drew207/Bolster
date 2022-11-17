import clsx from 'clsx';
import GooglePlaceAPI from 'components/common/google-place-api';
// import { NFTStorage, File, Blob } from 'nft.storage';
import React from 'react';
import { useForm } from 'react-hook-form';
import Autocomplete from 'react-google-autocomplete';

export default function Upload() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		setError,
		clearErrors,
		formState: { errors, isDirty, isValid },
	} = useForm({
		mode: 'onChange',
	});

	const [address, setAddress] = React.useState();
	const [section, setSection] = React.useState('user_data');
	const [addressValid, setAddressValid] = React.useState(false);
	const [userData, setUserData] = React.useState<any>();

	const rules = {
		required: {
			required: { value: true, message: 'This is required' },
		},
	};

	const TOKEN_GOOGLE_API = 'AIzaSyDNQIlXXD79FkgsqYnSr9RRVkywb-j6RC0';

	// const restrictions: any[] = ['us', 'uk'];

	// const disabled = !isDirty || !isValid || !addressValid;

	return (
		<div className="app h-screen flex flex-col gap-4 items-center w-full relative py-40 text-primary">
			<Autocomplete
				apiKey={TOKEN_GOOGLE_API}
				onPlaceSelected={(place: any) => console.log(place)}
				className="p-4 bg-overlay rounded-xl"
			/>
		</div>
	);
}
