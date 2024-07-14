import './App.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Passwords from './components/passwords'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [form, setform] = useState({ site: "", username: "", pass: "" });
  const [passwordArray, setpasswordArray] = useState([]);


  //useeffect to save the info even after reload
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("passwords", JSON.stringify(passwordArray))
  }


  //handlechange
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
    // saveToLS()

  }

  //handlesave
  const handlesave = () => {
    if (form.site != "" && form.username != "" && form.password != "") {

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      console.log([...passwordArray, { ...form, id: uuidv4() }]);
      // setform({ form.site: "", username: "", pass: "" });
      // saveToLS()
    }

  }
  //handleedit
  const handleedit = (e, id) => {

    setform(passwordArray.filter(i => i.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id));
    // saveToLS()

  };

  //handledelete
  const handledelete = (e, id) => {
    setpasswordArray(passwordArray.filter(item => item.id !== id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    // saveToLS()

  };

  //copytext
  const copytext = (text) => {
    alert("copied to clipboard:  " + text);
    navigator.clipboard.writeText(text);
    // saveToLS()
  }

  return (

    <>
      {/* main container  */}
      <div className='container w-screen pb-12 bg-red-50 min-h-[92vh]'>

        <Navbar />

        {/* heading */}
        <div className='flex w-56 ml-[40vw] flex-col justify-centre '>

          <div className='ml-10 font-bold text-2xl'>
            <span className=' text-green-600'>{"<"}</span>
            <span>Pass</span>
            <span className=' text-green-600'>{"OP/>"}</span>
          </div>
          <div className=''>Your own password manager</div>
        </div>

        {/* inputs */}
        <div className='my-4 mx-56' ><input className='border-2 w-[65vw] border-green-500 rounded-full' type="text" placeholder='Enter Website URL' vlaue={form.site} name='site' onChange={handlechange} /></div>
        <div className='flex gap-4 w-[65vw] my-4 mx-56 '>
          <div><input value={form.username} name='username' onChange={handlechange} className='border-2 w-[38vw] border-green-500 rounded-full' type="text" placeholder='Enter Username' /></div>
          <div><input vlaue={form.pass} name='pass' onChange={handlechange} className='border-2 w-[26vw] border-green-500 rounded-full' type="password" id="pass" placeholder='Enter password' /></div>
        </div>

        {/* save */}
        <div onClick={handlesave} className=' cursor-pointer flex mx-auto mt-8 p-1 pl-2 font-bold text-xl w-28 h-10 rounded-full bg-green-500 border-black border-2 hover:bg-green-400'>
          <div><img width={30} height={30} src="src/svgs/save.svg" alt="img" /></div>
          <div>Save</div>
        </div>
        {/* your passwords */}
        <div className=' font-bold text-2xl ml-56 '>Your Passwords</div>

        {passwordArray.length === 0 && <div className=" ml-56">No passwords to show</div>}
        {passwordArray.length != 0 && <div>

          <div className=' w-[65vw] ml-56 mt-2 bg-green-800 h-7 flex justify-around text-white font-bold'>
            <div>Site</div>
            <div>Username</div>
            <div>Password</div>
            <div>Actions</div>
          </div>
          {/* list of passwords  */}

          {passwordArray.map(item => {
            return (

              <Passwords
                key={item.id}
                sitename={item.site}
                username={item.username}
                password={"*".repeat(item.pass.length)}

                copytextsitename={() => { copytext(item.site) }}
                copytextusername={() => { copytext(item.username) }}
                copytextpassword={() => { copytext(item.pass) }}

                handleedit={(e) => { handleedit(e, item.id) }}
                handledelete={(e) => { handledelete(e, item.id) }}
              />

            )
          })};

        </div>
        }

        <Footer />

      </div>
    </>

  )
};

export default App;
