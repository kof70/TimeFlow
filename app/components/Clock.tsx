import { useState, useEffect } from 'react'

interface ClockProps {
  darkMode: boolean
}

export default function Clock({ darkMode }: ClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  return (
    <div className={`w-64 h-64 rounded-full border-4 ${darkMode ? 'border-white' : 'border-gray-800'} relative mb-8`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
        </div>
      </div>
      <div
        className={`w-1 h-16 bg-red-500 absolute top-1/2 left-1/2 origin-bottom transform -translate-x-1/2 transition-transform duration-300 ease-in-out`}
        style={{ transform: `translateX(-50%) rotate(${(hours % 12) * 30 + minutes / 2}deg)` }}
      ></div>
      <div
        className={`w-1 h-24 bg-blue-500 absolute top-1/2 left-1/2 origin-bottom transform -translate-x-1/2 transition-transform duration-300 ease-in-out`}
        style={{ transform: `translateX(-50%) rotate(${minutes * 6}deg)` }}
      ></div>
      <div
        className={`w-0.5 h-28 bg-yellow-500 absolute top-1/2 left-1/2 origin-bottom transform -translate-x-1/2 transition-transform duration-300 ease-in-out`}
        style={{ transform: `translateX(-50%) rotate(${seconds * 6}deg)` }}
      ></div>
    </div>
  )
}

