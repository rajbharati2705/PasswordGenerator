import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css';

function App() {
  const [length,setLength]=useState(8);
  const [numbers,setNumbers]=useState(false);
  const [character,setCharacter]=useState(false);
  const [Password,setPassword]=useState("")

  const passwordRef = useRef(null)

  const generatePassword =useCallback ( () =>{
    let pass="";
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbers) str+="0123456789";
    if(character) str+="!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);     
    }
    setPassword(pass);
  },[length,numbers,character,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect ( ()=>{
    generatePassword()
  },[length,numbers,character,generatePassword])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
         <h1 className='text-white text-center my-3'>Password generator</h1>
         <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type='text'
           placeholder='Password' 
           className="outline-none w-full py-1 px-3"
           readOnly 
           value={Password}
          ref={passwordRef}
           ></input>
           <button  className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 mx-2 rounded-lg hover:bg-blue-950'
           onClick={ copyPasswordToClipboard}>Copy</button>
         </div>
         <input type='range'
           className='cursor-pointer'
           min={8}
           max={100}
           onChange={ (e)=>{ setLength(e.target.value) } }
           value={length}></input> 
         <label>Length :{length} </label>
         <input type='checkbox' defaultChecked={numbers} onChange={ ()=>{setNumbers((prev)=> (!prev))}}></input>
         <label>Numbers</label>
         <input type='checkbox' defaultChecked={character} onChange={ ()=>{setCharacter((prev)=>(!prev))}}></input>
         <label>Character</label>
         </div>
    </>
  );
}

export default App;
