import useMagicLink from './useMagicLink';
import { useMetamask } from './useMetamask';

export const useFunctions = () => {
	const { mint } = useMagicLink();
	const { Mint } = useMetamask();

	const MintGlobalBottle = (
		typeOfWallet: any,
		quantity: any,
		address: string,
		setIsLoading: any,
		bottleContract: string,
		setMessage: any,
		accounts: any,
		dispatch: any,
		network: any,
		networkName: any,
		hideBuy: any,
		show: any,
		setQuantity: any,
		setMaxSupply: any
	) => {
		if (typeOfWallet == 'metamask') {
			Mint(
				quantity,
				address,
				setIsLoading,
				bottleContract,
				setMessage,
				accounts,
				dispatch,
				network,
				networkName,
				hideBuy,
				show,
				setQuantity,
				setMaxSupply
			);
		} else {
			mint(
				bottleContract,
				quantity,
				address,
				dispatch,
				setMessage,
				hideBuy,
				show,
				setQuantity,
				setMaxSupply
			);
		}
	};

	return { MintGlobalBottle };
};
