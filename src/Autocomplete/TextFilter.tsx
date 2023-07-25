import React, { useState } from 'react'

interface TextFilterProps {
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
    value: string
} 

const TextFilter = ({value, onChange, onFocus} : TextFilterProps) => {
  return (
    <input type='text' onChange={onChange} value={value} onFocus={onFocus} />
  )
}

export default TextFilter