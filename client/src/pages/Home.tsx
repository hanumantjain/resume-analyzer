import React, { useState } from 'react'
import { uploadResume } from '../api/auth'

const Home = () => {
    const[status, setStatus] = useState('')
    const[text, setText] = useState('')

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setStatus('Uploading....')

        try{
            const result = await uploadResume(file)
            setText(result.text)
            setStatus('File uploaded successfully')
        } catch (err) {
            console.error(err)
            setStatus('Upload failed')
        }
    }
  return (
    <div>
        <input type="file" accept='application/pdf' onChange={handleChange} />
        <p>{status}</p>
        {text && (
            <>
            <h3>Extracted text</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{text}</pre>
            </>
        )}
    </div>
  )
}

export default Home