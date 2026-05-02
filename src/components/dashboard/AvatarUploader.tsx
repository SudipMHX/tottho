'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { FiCamera, FiLoader, FiCheck, FiAlertCircle, FiUser } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useUploadThing } from '@/lib/uploadthing'

interface Props {
  currentAvatar?: string
  displayName?: string
}

const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));

        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Compression failed"));
          const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
            type: "image/webp",
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        }, "image/webp", 0.8);
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function AvatarUploader({ currentAvatar, displayName }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { startUpload, isUploading } = useUploadThing("avatarUploader", {
    onClientUploadComplete: () => {
      setSuccess('Avatar uploaded successfully ✓')
      router.refresh()
    },
    onUploadError: (err) => {
      setError('Upload failed: ' + err.message)
      setPreview(null)
    }
  })

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setSuccess(null)

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, GIF, WebP).')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setError('File too large. Maximum size is 4MB.')
      return
    }

    try {
      // Compress the file before uploading
      const compressedFile = await compressImage(file)
      
      // Local preview
      const reader = new FileReader()
      reader.onload = (ev) => setPreview(ev.target?.result as string)
      reader.readAsDataURL(compressedFile)

      // Start uploadthing upload
      await startUpload([compressedFile])
    } catch (err) {
      console.error('Compression or upload error:', err)
      setError('An error occurred during upload.')
      setPreview(null)
    }
  }

  const avatarSrc = preview ?? currentAvatar

  return (
    <div className="card">
      <h2 className="font-semibold text-gray-900 mb-1">Profile avatar</h2>
      <p className="text-sm text-gray-400 mb-5">
        Upload a photo. Images are automatically compressed before upload to save storage.
      </p>

      <div className="flex items-center gap-6">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-200 flex items-center justify-center">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt="Avatar preview"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                unoptimized={!!preview}
              />
            ) : (
              <FiUser className="text-gray-300 text-4xl" />
            )}
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md hover:brightness-110 transition-all disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #FFA040, #FF3366)' }}
            title="Change avatar"
          >
            {isUploading ? <FiLoader className="animate-spin text-sm" /> : <FiCamera className="text-sm" />}
          </button>
        </div>

        <div className="flex-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="btn btn-secondary w-full sm:w-auto"
          >
            {isUploading ? (
              <><FiLoader className="animate-spin" /> Uploading...</>
            ) : (
              <><FiCamera /> Choose image</>
            )}
          </button>
          <p className="text-xs text-gray-400 mt-2">JPG, PNG, WebP, GIF · Auto-compressed on device</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileSelect}
      />

      {error && (
        <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          <FiAlertCircle className="shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          <FiCheck className="shrink-0" />
          {success}
        </div>
      )}
    </div>
  )
}
