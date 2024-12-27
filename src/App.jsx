import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8);
  const [numall, setnumall] = useState(false);
  const [charall, setcharall] = useState(false);
  const [password, setpass] = useState('');
  const passRef=useRef(null);
 
  const PasswordGenerator = useCallback(() => {
    let characters = '';
    let pass = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numall) {
      pass += '0123456789';
    }
    if (charall) {
      pass += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    }
    for (let i = 0; i < length; i++) {
      let num = Math.floor(Math.random() * pass.length);
      characters += pass.charAt(num);
    }
    setpass(characters);
  }, [length, numall, charall]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numall, charall]);

  const copytoClipboard=useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])
  return (
    <>
      <h1 className="text-4xl text-center text-white">Password Generator</h1>
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-md text-center shadow-md rounded-lg px-4 my-8 py-4 text-orange-500 bg-gray-500">
          <div className="flex shadow-md overflow-hidden rounded-lg">
            <input
              type="text"
              placeholder="Password"
              value={password}
              readOnly
              className="outline-none w-full px-3 py-1 rounded-lg"
              ref={passRef}
            />
            <button
              className="outline-none bg-blue-700 text-white py-0.5 px-3 shrink-0 rounded-lg transform transition-transform duration-200 hover:scale-110"
              onClick={copytoClipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2 py-3">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setlength(parseInt(e.target.value, 10))}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={numall}
                onChange={() => setnumall((prev) => !prev)}
                className='transform transition-transform duration-200 hover:scale-125'
              />
              <label>Number</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={charall}
                onChange={() => setcharall((prev) => !prev)}
                className='transform transition-transform duration-200 hover:scale-125'
              />
              <label>Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
