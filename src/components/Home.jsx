import React, { useState } from 'react'
import './Home.css'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const [name,setName] = useState("");
    const navigate = useNavigate()
    let message = '';

    const addName = ()=>{
      axios.post("http://localhost:5000/api/addName",{name:name})
      .then(response=>{
        if(response){
          message = response.data.msg;
          alert(message);
          navigate(`/map/${name}`);
        }
      })
      .catch(err=>console.log(err))
    }
  return (
    <div className='homeContainer'>
        <input type="text" placeholder='Search...' onChange={(e)=>setName(e.target.value)} value={name} className='searchText'/>&nbsp;
        <Button variant="dark" className='searchbtn' onClick={addName}>Add</Button>
    </div>
  )
}

export default Home