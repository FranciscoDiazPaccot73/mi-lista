type Toast = {
  title: string,
  status: string,
  description: string,
  isClosable: boolean,
  duration: number,
  position: string,
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

export const emitToast = ({ toast, type = 'success', duration = 3000, isClosable = true }: ToastObj) => {
  const toasts: Toasts = {
    success: {
      title: `OK!`,
      status: type,
      description: "Se guardo tu lista correctamente",
      isClosable,
      duration,
      position: 'top',
    },
    info: {
      title: `Listo!`,
      status: type,
      description: "Se elimino tu lista correctamente",
      isClosable,
      duration,
      position: 'top',
    },
    warning: {
      title: `Cuidado!`,
      status: type,
      description: "La lista que tenes guardada no esta actualizada",
      isClosable,
      duration,
      position: 'top',
    }
  }

  return toast(toasts[type as keyof Toasts]);
}

export const filterItems = (value: string, items: any, reset: boolean | undefined) => {
  if (reset || !value || value === '' || value === ' ') return items;

  const newItems = items.filter((i: any) => (i.text?.includes(value)) || i.url?.includes(value))

  return newItems;
}
