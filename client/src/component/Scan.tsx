import React, { useRef, useState, type FormEvent } from 'react'
import { uploadResume } from '../api/auth'

interface ScanProps {
    extractedText: (text: string) => void
}

const Scan: React.FC<ScanProps> = ({ extractedText }) => {
    const[file, setFile] = useState<File | null>(null)
    const[fileName, setFileName] = useState('')
    const[status, setStatus] = useState('')
    const[jobDescription, setJobDescription] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return
        setFile(selectedFile)
        setFileName(selectedFile.name)
    }

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if(!file || !jobDescription.trim()){
            setStatus('Please Upload a file')
            return
        }
        try{
            const result = await uploadResume(file, jobDescription)
            extractedText(result.text)
        } catch (err) {
            console.error(err)
            setStatus('Upload failed. Please try again')
        }
    }
  return (
    <div className='flex flex-col p-4 gap-4'>
        <div className='w-full flex gap-10'>
            <div className='border border-black rounded w-1/2 h-96 flex flex-col'>
                <div className='border-b p-4 text-xl'>
                    <h1 className=''>Resume</h1>
                </div>
                <div className='h-full flex flex-col items-center '>
                    <div className='object-bottom flex flex-col justify-center items-center h-full'>
                        {fileName &&
                            <div className='flex flex-col justify-center'>
                                <p className='text-2xl pb-1'>{fileName}</p>
                                <button 
                                    className='text-center underline cursor-pointer'
                                    onClick={() => {
                                        setFile(null)
                                        setFileName('')
                                        setStatus('')
                                        if(fileInputRef.current){
                                            fileInputRef.current.value = ''
                                        }
                                    }}>
                                    Remove File
                                </button>
                            </div>
                        }
                       {status}
                    </div>
                    <div className='mt-auto p-4'>
                        <label className='flex flex-col items-center justify-center border-2 border-dashed cursor-pointer'>
                        <span className='px-12 py-3'>Upload Resume (PDF)</span>
                            <input 
                              ref = {fileInputRef}
                              type="file" 
                              accept='application/pdf'
                              onChange={handleChange}
                              className='hidden' 
                            />
                        </label>
                    </div>
                </div>

            </div>
            <div className='border border-black rounded w-1/2 h-96 flex flex-col'>
                <div className='border-b p-4 text-xl'>
                    <h1 className=''>Job Description</h1>
                </div>
                <div className='flex-1 w-full '>
                    <textarea 
                        placeholder='Copy and Paste your job description'
                        className='p-4 w-full h-full resize-none'
                        onChange={e => setJobDescription(e.target.value)}
                    />
                </div>
            </div>
        </div>
        <div className='flex justify-end'>
            <button 
                className='border px-20 rounded py-3'
                onClick={handleSubmit}
                >Scan</button>
        </div>
    </div>
  )
}

export default Scan