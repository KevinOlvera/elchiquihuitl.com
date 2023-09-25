import { useState } from 'react'

interface InputProps {
  placeholder: string
  icon?: JSX.Element
}

function Input(props: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(!isFocused)
  }

  return (
    <div className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className={`w-full p-3 rounded-lg flex border ${!isFocused ? 'border-gray-300' : 'border-mondo-900'}`}>
          {
            (props.icon != null)
              ? <div className={`${!isFocused ? 'text-gray-400' : 'text-mondo-900'}`}>
                {props.icon}
              </div>
              : ''
          }
          <input
            type="text"
            className="w-full pl-2 focus:outline-none"
            placeholder={props.placeholder}
            onFocus={() => { handleFocus() }}
            onBlur={() => { handleFocus() }}
          />
        </div>
      </div>
    </div >
  )
}

export default Input
