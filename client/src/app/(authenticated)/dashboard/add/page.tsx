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
  const [semester, setSemester] = useState("");
  const [program, setProgram] = useState("");

  const [file, setFile] = useState<File | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!program || !semester) {
      return alert("program and semester required");
    }
    setLoading(true)
    try {
      let fileUrl = "";
      if (file) {
        const checksum = await computeSHA256(file);
        const { data } = await axios.post<{ url: string, fileUrl: string }>("/s3/getSignedUrl", {
          checksum,
          fileType: file.type,
          size: file.size
        })

        const { url } = data;
        fileUrl = data.fileUrl;

        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type
          }
        })
        alert("PDF uploaded to S3")
      }
      await axios.post("/assignment", {
        type,
        subject,
        due: date,
        url: fileUrl == "" ? fileUrl : null,
        program,
        semester
      })

      alert("Assignment Uploaded!")

    } catch (error) {
      console.log(error)
      alert("Failed to upload")
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <h2 className='text-3xl'> Add an Assignment </h2>
      <form onSubmit={handleSubmit} className='my-5 flex flex-col gap-6  justify-center'>
        <div className='flex md:flex-row flex-col gap-3 items-start my-3'>
          <div className='text-xl'>
            <label className='p-2' htmlFor='type'>Assignment type:</label>
            <input
              onChange={(e) => setType(e.target.value)}
              required id='type'
              className='border-2 border-slate-600 focus:border-slate-200 p-1 mx-2 rounded-md outline-none'
              type='text' />
          </div>
          <div className='text-xl'>
            <label className='p-2' htmlFor='subject'>Subject Name:</label>
            <input
              onChange={(e) => setSubject(e.target.value)}
              required
              id='subject'
              className='border-2 border-slate-600 focus:border-slate-200 p-1 mx-2 rounded-md outline-none'
              type='text' />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-start gap-5 md:items-end'>
          <DatePicker label={"Due Date"} date={date} open={open} setDate={setDate} setOpen={setOpen} />
          <SelectComponent value={program} setValue={setProgram} args={["BCA", "BBA"]} defaultLabel='Class' label='Enter Program' />
          <SelectComponent value={semester} setValue={setSemester} args={["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]} defaultLabel='Semester' label='Enter Semester' />
        </div>
        <div className='flex flex-col'>
          <UploadComponent file={file} setFile={setFile} />
          <Button
            type='submit'
            disabled={loading}
            className='cursor-pointer mx-auto'>
            {loading ? "Uploading ..." : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddAssignment
