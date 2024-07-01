'use client'

import { useEffect, useState } from 'react'
import { ImagePlus, Trash } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

type ImageUploadProps = {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }
  // Return null if the client component has not mounted.
  // Prevents hydration error by ensuring the client component is mounted before rendering the modal.
  if (!isMounted) return null

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative h-[200px] w-[200px] overflow-hidden rounded-md'
          >
            <div className='absolute right-2 top-2 z-10'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant={'destructive'}
                size={'icon'}
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image
              fill
              sizes='200px'
              className='object-cover'
              alt='Image'
              src={url}
            />
          </div>
        ))}
      </div>
      {/* TODO: onUpload is deprecated, onSuccess allows only uses the most recent image, investigate a fix: https://next.cloudinary.dev/clduploadwidget/configuration */}
      <CldUploadWidget onUpload={onUpload} uploadPreset='rb3gbobf'>
        {({ open }) => {
          return (
            <Button
              type='button'
              disabled={disabled}
              variant={'secondary'}
              onClick={() => open()}
            >
              <ImagePlus className='mr-2 h-4 w-4' />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
