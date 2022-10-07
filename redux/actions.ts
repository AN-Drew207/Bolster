import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import bottlesTestnet from '../bottles_mumbai.json';
import bottlesMainnet from '../bottles_polygon.json';

export interface State {
	address: string;
	offersActiveReceived: any;
	offersActiveMade: any;
	network: string;
	networkName: string;
	bottles: any[];
	exchange: string;
	typeOfWallet: string;
}

const initialState: State = {
	address: '',
	typeOfWallet: '',
	offersActiveReceived: [],
	offersActiveMade: [],
	network: process.env.NEXT_PUBLIC_POLYGON_ID
		? process.env.NEXT_PUBLIC_POLYGON_ID
		: '80001', //testnet 80001; mainnet 137;
	networkName: process.env.NEXT_PUBLIC_NETWORK_NAME
		? process.env.NEXT_PUBLIC_NETWORK_NAME
		: 'mumbai',
	bottles:
		process.env.NEXT_PUBLIC_POLYGON_ID == '137'
			? bottlesMainnet
			: bottlesTestnet,
	exchange: process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
		? process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS
		: '',
};

export const stateSlice = createSlice({
	name: 'state',
	initialState,
	reducers: {
		updateState: (state, action: PayloadAction<any>) => {
			state.address = action.payload.address;
			state.typeOfWallet = action.payload.typeOfWallet;
			state.offersActiveReceived = action.payload.offersActiveReceived;
			state.offersActiveMade = action.payload.offersActiveMade;
		},
		updateBalance: (state, action: PayloadAction<any>) => {
			state.bottles[action.payload.index] = {
				...state.bottles[action.payload.index],
				balanceOfUser: action.payload.balanceOfUser,
				allowance: action.payload.allowance,
				balanceUSDCInContract: action.payload.balanceUSDCInContract,
			};
		},

		updateTokensOfUser: (state, action: PayloadAction<any>) => {
			state.bottles[action.payload.index] = {
				...state.bottles[action.payload.index],
				tokensOfUser: action.payload.tokensOfUser,
			};
		},

		updateNFTs: (state, action: PayloadAction<any>) => {
			state.bottles[action.payload.index] = {
				...state.bottles[action.payload.index],
				NFTs: action.payload.NFTs,
			};
		},
		updateBottleState: (state, action: PayloadAction<any>) => {
			state.bottles[action.payload.index] = {
				...state.bottles[action.payload.index],
				exchanged: action.payload.exchanged,
				supply: action.payload.supply,
				maxSupply: action.payload.maxSupply,
			};
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	updateState,
	updateBalance,
	updateBottleState,
	updateTokensOfUser,
	updateNFTs,
} = stateSlice.actions;

export default stateSlice.reducer;
