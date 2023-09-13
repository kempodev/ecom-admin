'use client'

import { useEffect, useState } from 'react'

import { StoreModal } from '@/components/modals/StoreModal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Return null if the client component has not mounted.
  // Prevents hydration error by ensuring the client component is mounted before rendering the modal.
  if (!isMounted) return null
  return <StoreModal />
}
