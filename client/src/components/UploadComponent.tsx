"use client"
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react"
import { Upload } from "lucide-react"

interface props {
    file: File | undefined;
    setFile: Dispatch<SetStateAction<File | undefined>>
    statusMessage: string;
}

function UploadComponent({ file, setFile, statusMessage }: props) {
    const [localFileURL, setLocalFileURL] = useState<string | undefined>(undefined)
    const fileInputRef = useRef<null | HTMLInputElement>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0]
        setFile(newFile)

        if (localFileURL) {
            URL.revokeObjectURL(localFileURL)
        }
        if (newFile) {
            const url = URL.createObjectURL(newFile)
            setLocalFileURL(url)
        } else {
            setLocalFileURL(undefined)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="p-4 rounded-md w-[50vw] min-h-30">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    title="upload file"
                    className="flex cursor-pointer group flex-col items-center gap-5 justify-center border-3 border-slate-200 border-dashed hover:bg-stone-800 bg-stone-900 p-3 rounded-lg">
                    <input
                        ref={fileInputRef}
                        type="file"
                        name="media"
                        accept="application/pdf"
                        onChange={handleChange}
                        className="hidden"
                    />
                    <Upload
                        className="size-6 group-hover:scale-110 transition-all duration-200 cursor-pointer"
                    />
                    <div>Upload File <p className="text-red-500">*Max 5 Mb</p></div>
                    {statusMessage ? statusMessage : ""}
                </div>

                {localFileURL && file && (
                    <div className="mt-3 w-64 h-64 border border-gray-400 rounded-md overflow-hidden">
                        <iframe src={localFileURL} className="w-full h-full" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default UploadComponent
