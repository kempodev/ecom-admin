import { Loader2 } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex gap-2'>
        <Loader2 className='animate-spin' />
        Loading...
      </div>
    </div>
  )
}
