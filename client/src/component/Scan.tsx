import React, { useRef, useState, type FormEvent } from 'react'
import { uploadResume } from '../api/auth'

interface ScanProps {
    extractedText: (text: string) => void
}

const Scan: React.FC<ScanProps> = ({ extractedText }) => {
    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState('')
    const [status, setStatus] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return

        if (selectedFile.type !== 'application/pdf') {
            alert('Please upload a PDF file.')
            return
        }

        setFile(selectedFile)
        setFileName(selectedFile.name)
        setStatus('')
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!file || !jobDescription.trim()) {
            if (!file) setStatus('Please upload a resume (PDF).')
            else if (!jobDescription.trim()) setStatus('Please paste the job description.')
            return
        }

        setLoading(true)
        setStatus('')

        try {
            const result = await uploadResume(file, jobDescription)
            extractedText(result.score)
        } catch (err) {
            console.error(err)
            setStatus('Upload failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col p-4 gap-4'>
            <div className='w-full flex flex-col md:flex-row gap-10'>
                <div className='border border-black rounded md:w-1/2 w-full h-96 flex flex-col'>
                    <div className='border-b p-4 text-xl'>
                        <h1>Resume</h1>
                    </div>
                    <div className='h-full flex flex-col items-center'>
                        <div className='object-bottom flex flex-col justify-center items-center h-full'>
                            {fileName ? (
                                <div className='flex flex-col justify-center'>
                                    <p className='text-2xl pb-1'>{fileName}</p>
                                    <button
                                        className='text-center underline cursor-pointer'
                                        onClick={() => {
                                            setFile(null)
                                            setFileName('')
                                            setStatus('')
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = ''
                                            }
                                        }}
                                    >
                                        Remove File
                                    </button>
                                </div>
                            ) : (
                                <p className='text-gray-500'>No file uploaded</p>
                            )}

                            {status && (
                                <div className='mt-2 text-sm text-red-600 text-center'>{status}</div>
                            )}
                        </div>
                        <div className='mt-auto p-4 w-full'>
                            <label className='flex flex-col items-center justify-center border-2 border-dashed cursor-pointer transition-colors hover:bg-gray-50'>
                                <span className='px-10 py-3'>Upload Resume (PDF)</span>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept='application/pdf'
                                    onChange={handleChange}
                                    className='hidden'
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Job Description Textarea */}
                <div className='border border-black rounded md:w-1/2 w-full h-96 flex flex-col'>
                    <div className='border-b p-4 text-xl'>
                        <h1>Job Description</h1>
                    </div>
                    <div className='flex-1 w-full'>
                        <textarea
                            placeholder='Copy and paste your job description here'
                            className='p-4 w-full h-full resize-none'
                            value={jobDescription}
                            onChange={e => setJobDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className='flex justify-end'>
                <button
                    className='border px-20 rounded py-3 cursor-pointer disabled:opacity-50'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Scanning...' : 'Scan'}
                </button>
            </div>
        </div>
    )
}

export default Scan
