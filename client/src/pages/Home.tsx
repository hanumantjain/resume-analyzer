import { useState } from 'react'
import Result from '../component/Result'
import Scan from '../component/Scan'
import Navbar from '../component/Navbar'

const Home = () => {
    const[result, setResult] = useState('')
  return (
    <div>
      <Navbar />
      <Scan extractedText={(value: string) => setResult(value)}/>
      <Result result={result} />
    </div>
  )
}

export default Home