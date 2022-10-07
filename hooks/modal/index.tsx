import { useCallback, useState, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

export const useModal = () => {
	const [isShow, setIsShow] = useState(false);
	const cancelButtonRef = useRef<HTMLDivElement>(null);
	const hide = () => {
		setIsShow(false);
	};

	const show = () => {
		setIsShow(true);
	};

	const Modal = useCallback(({ children, isShow, hasBg, onClose }) => {
		return (
			<Transition.Root show={isShow} as={Fragment}>
				<Dialog
					as="div"
					static
					className={clsx(
						{ ['bg-overlay']: hasBg },
						'fixed z-20 inset-0 overflow-y-auto'
					)}
					initialFocus={cancelButtonRef}
					open={isShow}
					onClose={() => {
						hide();
						if (onClose) {
							onClose();
						}
					}}
				>
					<div className="flex items-center justify-center pb-20 px-4 min-h-screen text-center sm:block sm:p-0 ">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 transition-opacity" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div className="inline-block align-bottom text-left overflow-hidden transform transition-all sm:align-middle my-8 sm:w-full sm:max-w-lg ">
								<div className="pb-4 px-4 bg-transparent sm:p-6 sm:pb-4">
									{children}
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		);
	}, []);

	return { Modal, hide, isShow, show };
};
