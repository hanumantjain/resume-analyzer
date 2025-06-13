import { useState } from 'react'
import Result from '../component/Result'
import Scan from '../component/Scan'

const Home = () => {
    const[result, setResult] = useState('')
  return (
    <div>
        <Scan extractedText={(value: string) => setResult(value)}/>
        <Result result={result} />
    </div>
  )
}

export default Home