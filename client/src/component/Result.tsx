import React from 'react'

interface ResultProps {
    result: string
}

const Result: React.FC<ResultProps> = ({ result }) => {
  // const items = result.split('.').map(item => item.trim())
  return (
    <div className='p-5'>Result: 
    {result}
      {/* <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default Result