"use client"
import { getSignedURLAction } from '@/actions/create.actions'
import { DatePicker } from '@/components/date-picker'
import { SelectComponent } from '@/components/select'
import { Button } from '@/components/ui/button'
import UploadComponent from '@/components/UploadComponent'
import axios from 'axios'
import React, { FormEvent, useState } from 'react'

function AddAssignment() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [file, setFile] = useState<File | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatusMessage("uploading")
    setLoading(true)
    try {
      if (file) {
        const checksum = await computeSHA256(file);
        const signedUrlResult = await getSignedURLAction(file.type, file.size, checksum)
        if (signedUrlResult.failure) {
          setStatusMessage("failed")
          setLoading(false)
        }

        if (!signedUrlResult.success) throw new Error(signedUrlResult.failure)
        const { url, mediaId } = signedUrlResult?.success

        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type
          }
        })
        setStatusMessage("PDF uploaded to S3")

        // await createPost({ content, mediaId });
      }
    } catch (error) {
      console.log(error)
      setStatusMessage("failed")
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <h2 className='text-3xl'> Add an Assignment </h2>
      <form onSubmit={handleSubmit} className='my-5 flex flex-col gap-6 items-start justify-center'>
        <div className='flex gap-3 items-center my-3'>
          <div className='text-xl'>
            <label htmlFor='name'>Assignment type:</label>
            <input id='name' className='border-2 border-slate-600 focus:border-slate-200 p-1 mx-2 rounded-md outline-none' type='text' />
          </div>
          <div className='text-xl'>
            <label htmlFor='subject'>Subject Name:</label>
            <input id='subject' className='border-2 border-slate-600 focus:border-slate-200 p-1 mx-2 rounded-md outline-none' type='text' />
          </div>
        </div>
        <div className='flex gap-5 items-end'>
          <DatePicker label={"Due Date"} date={date} open={open} setDate={setDate} setOpen={setOpen} />
          <SelectComponent args={["BCA", "BBA"]} defaultLabel='Class' label='Enter Program' />
          <SelectComponent args={["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]} defaultLabel='Semester' label='Enter Semester' />
        </div>
        <UploadComponent statusMessage={statusMessage} file={file} setFile={setFile} />
        <Button className='cursor-pointer'>Upload</Button>
      </form>
    </div>
  )
}

export default AddAssignment
