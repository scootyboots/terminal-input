import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import './TerminalInput.css'

interface TerminalInputProps {
  placeholder?: string
  type: string
  focus: boolean
}

export default function TerminalInput({
  type,
  placeholder,
  focus,
}: TerminalInputProps) {
  const [carrotOffset, setCarrotOffset] = useState(0)
  const [focusState, setFocusState] = useState(false)
  const terminalInputEl = useRef<HTMLInputElement>(null)
  const inputPadding = '40'
  const textWidth = 14.45555

  function handleInputChange() {
    console.log('selection start:', terminalInputEl.current?.selectionStart)
    if (terminalInputEl.current?.selectionStart) {
      setCarrotOffset(terminalInputEl.current?.selectionStart)
    }
    if (terminalInputEl.current?.selectionStart === 0) {
      setCarrotOffset(0)
    }
  }

  function handleKeypress(event: KeyboardEvent) {
    if (
      (event.key === 'ArrowLeft' && !event.metaKey) ||
      (event.key === 'b' && event.ctrlKey)
    ) {
      if (terminalInputEl.current?.value.length) {
        setCarrotOffset((curOffset) => (curOffset - 1 >= 0 ? curOffset - 1 : 0))
      }
    }
    if (
      (event.key === 'ArrowLeft' && event.metaKey) ||
      (event.key === 'a' && event.ctrlKey)
    ) {
      setCarrotOffset(0)
    }
    if (
      (event.key === 'ArrowRight' && !event.metaKey) ||
      (event.key === 'f' && event.ctrlKey)
    ) {
      if (terminalInputEl.current?.value.length) {
        if (carrotOffset + 1 <= terminalInputEl.current?.value.length)
          setCarrotOffset((curOffset) => curOffset + 1)
      }
    }
    if (
      (event.key === 'ArrowRight' && event.metaKey) ||
      (event.key === 'e' && event.ctrlKey)
    ) {
      if (terminalInputEl.current?.value) {
        console.log(
          'search input length:',
          terminalInputEl.current.value.length
        )
        setCarrotOffset(terminalInputEl.current.value.length)
      }
    }
    // TODO: support for skipping between words
  }

  useEffect(() => {
    if (focus) {
      terminalInputEl.current?.focus()
    }
  }, [])

  return (
    <div className="TerminalInput">
      <input
        className="TerminalInput__inputEl"
        type={type}
        placeholder={placeholder ? placeholder : 'input text here...'}
        onChange={() => handleInputChange()}
        onClick={() => handleInputChange()}
        onKeyDown={(event) => handleKeypress(event)}
        onFocus={() => setFocusState(true)}
        onBlur={() => setFocusState(false)}
        ref={terminalInputEl}
      />
      <div
        className={`TerminalInput__carot ${
          focusState ? '--stop-animation' : ''
        }`}
        style={{
          left: `${
            carrotOffset
              ? carrotOffset * textWidth + +inputPadding
              : inputPadding
          }px`,
        }}
      ></div>
    </div>
  )
}
