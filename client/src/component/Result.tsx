import React from 'react'

interface ResultProps {
    result: string
}

const Result: React.FC<ResultProps> = ({ result }) => {
  return (
    <div>Result: {result}</div>
  )
}

export default Result