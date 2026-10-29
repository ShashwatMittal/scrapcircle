import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export function Modal({ label, onClose, children }: { label: string; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const close = useRef(onClose)
  close.current = onClose
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const element = dialog.current
    element?.showModal()
    return () => { element?.close(); previous?.focus() }
  }, [])
  return <dialog className="modal" ref={dialog} aria-label={label} onCancel={event => { event.preventDefault(); close.current() }}>
    {children}
  </dialog>
}
