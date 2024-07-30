import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [spCharAllow, setspCharAllow] = useState(false)
  const [password,setPassword] = useState("")

  const passwordRef=useRef(null)

  const password_generator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllow) str+="0123456789"
    if(spCharAllow) str+="!#$%&()*+,-./:;<=>?@[\]^_`{|}~"

    for(let i=1;i<=length; i++){
      let char=Math.floor(Math.random()*str.length+1)

      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllow,spCharAllow,setPassword])

  const copy_to_clipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    password_generator()
  },[length,numberAllow,spCharAllow,password_generator])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}/>
        <button 
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copy_to_clipboard}>
        copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={40}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(e.target.value)}/>
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={numberAllow}
            id="numberInput"
            onChange={() => {
                setNumberAllow((prev) => !prev);
            }}
        />
        <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={spCharAllow}
                id="characterInput"
                onChange={() => {
                    setspCharAllow((prev) => !prev )
                }}
            />
            <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  ) 
}

export default App
