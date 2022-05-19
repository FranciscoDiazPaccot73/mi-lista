type Toast = {
  title: string,
  status: string,
  description: string,
  isClosable: boolean,
  duration: number,
}

type Toasts = {
  success: Toast,
  info: Toast,
  warning: Toast,
}

interface ToastObj {
  type?: string,
  duration?: number,
  isClosable?: boolean,
  toast: any,
}

export const emitToast = ({ toast, type = 'success', duration = 4000, isClosable = true }: ToastObj) => {
  const toasts: Toasts = {
    success: {
      title: `OK!`,
      status: type,
      description: "Se guardo tu lista correctamente",
      isClosable,
      duration,
    },
    info: {
      title: `Listo!`,
      status: type,
      description: "Se elimino tu lista correctamente",
      isClosable,
      duration,
    },
    warning: {
      title: `Cuidado!`,
      status: type,
      description: "La lista que tenes guardada no esta actualizada",
      isClosable,
      duration,
    }
  }

  return toast(toasts[type as keyof Toasts]);
}
