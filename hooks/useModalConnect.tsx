import { MailOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { Button } from 'components/common/button';
import { Loading } from 'components/landing/loadingComponent';

import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux/actions';
import { useModal } from './modal';
import useMagicLink from './useMagicLink';
import { useMetamask } from './useMetamask';

export const useConnectWalletModal = () => {
	const { connectWalletUpdateData } = useMetamask();
	const { Modal, show, isShow, hide } = useModal();
	const { login, loading } = useMagicLink();
	const dispatch = useDispatch();
	const { address, network, networkName } = useSelector(
		(state: { state: State }) => {
			return state.state;
		}
	);
	const modal = (
		<Modal isShow={isShow && !address} hasBg>
			<div className="h-screen flex items-center justify-center">
				<div className="flex flex-col p-4 gap-4 items-center justify-center bg-overlay rounded-xl">
					<div className="w-full flex">
						<button onClick={() => hide()} className="font-bold text-secondary">
							Back
						</button>
					</div>
					{loading ? (
						<div className="flex flex-col gap-4 p-4 h-24 items-center justify-center w-96">
							<Loading small />
						</div>
					) : (
						<div className="flex flex-col gap-4 p-4 w-96">
							<Button
								className={clsx(
									'z-10 border border-secondary bg-secondary Raleway font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
									'hover:text-secondary'
								)}
								onClick={() =>
									connectWalletUpdateData(dispatch, network, networkName)
								}
							>
								<div className="flex items-center justify-center text-xl">
									<img src="/icons/metamask_logo.png" className="w-10" alt="" />{' '}
									Connect with Metamask
								</div>
							</Button>
							<Button
								className={clsx(
									'z-10 border border-secondary bg-secondary Raleway font-bold px-4 py-3 text-white transition ease-in-out delay-150 hover:bg-white hover:border-secondary duration-300',
									'hover:text-secondary'
								)}
								onClick={() => login(dispatch)}
							>
								<div className="flex items-center justify-center gap-2 whitespace-nowrap text-xl">
									<MailOutlined className="text-lg" /> Connect with Email
								</div>
							</Button>
						</div>
					)}
				</div>
			</div>
		</Modal>
	);

	return { modal, show, hide };
};
