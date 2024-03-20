import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import savewater from '../../assets/savewater.png'

type UserPropsType = {
    firstName: string | undefined
    lastName: string | undefined
}
export default function Modal({ firstName, lastName }: UserPropsType) {
    const [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full flex flex-col justify-evenly  max-w-2xl min-h-[30vh] transform overflow-hidden rounded-2xl bg-gray-200 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-3xl font-primary font-bold leading-6 text-black/70"
                                    >
                                        {`Welcome ${firstName} ${lastName},`}
                                    </Dialog.Title>

                                    <div className="flex justify-start w-full">
                                        <img
                                            className="h-fit w-full"
                                            src={savewater}
                                        ></img>
                                    </div>
                                    <div className="flex flex-col justify-center items-center w-full">
                                        <div className="mt-2">
                                            <p className="text-xl text-blue-800 ">
                                                "Thousands have lived without
                                                love, not one without water."
                                            </p>
                                            <p className="text-end italic">
                                                - W. H. Auden
                                            </p>
                                        </div>
                                        <div className="mt-4 w-full ">
                                            <button
                                                type="button"
                                                className="inline-flex w-full  justify-center rounded-md border border-transparent bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:scale-[1.02] outline-none transition-all"
                                                onClick={closeModal}
                                            >
                                                Got it, thanks!
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
