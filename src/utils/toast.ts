import { ToastContainerProps, toast } from 'react-toastify'

type TToastType = 'info' | 'success' | 'error'

const toastConfig: ToastContainerProps = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
}

export const showToast = (
    type: TToastType,
    message: string,
    config?: ToastContainerProps
) => {
    const toastFn =
        type === 'info'
            ? toast.info
            : type === 'success'
              ? toast.success
              : toast.error

    return toastFn(message, {
        ...toastConfig,
        ...config,
    })
}
