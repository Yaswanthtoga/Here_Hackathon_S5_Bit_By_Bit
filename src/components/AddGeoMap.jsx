import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import GeoMaps from './GeoMaps';
import Sample from './Sample';

const AddGeoMap = () => {
    let btnRef = useRef();

    let {name} = useParams();
    const [mapLocation,setLocation] = useState({});
    const navigate = useNavigate();
    const [mapInfo,setMapInfo] = useState();

    useEffect(async ()=>{

        // Getting Geocoding Data
        await axios(`https://geocode.search.hereapi.com/v1/geocode?q=${name}&apiKey=6zFNLbNVTT5x0UxL8oy3dI9_HHqJ2bFuDEQArAQ6obQ`)
        .then(res=>res.data)
        .then((data)=>{
          setLocation(data.items[0].position);
          console.log(data.items[0].position);
        });

        // Get Mapinfo
        await axios.post("http://localhost:5000/api/getMapinfo",{name:name})
        .then(response=>{
          console.log(response);
          setMapInfo(response);
        })

        return ()=>{
          setLocation(null);
          setMapInfo(null);
        }

    },[name])

    const [state,setState] = useState([]);
    const {paths} = state;

    const new_path = JSON.stringify(state.paths);

    const saveMap = ()=>{
      axios.post("http://localhost:5000/api/addMap",{parentid:mapInfo.id,coordinates:new_path})
      .then(response=>{
        if(response){
          alert(`${response.data.msg}`)
        }else{
          alert("Something Went Wrong");
        }
      })
      .catch(err=>{
        console.log(err);
      })

      if(btnRef.current){
        btnRef.current.setAttribute("disabled","disabled")
      }
    }

  return (
    <div>
      <GeoMaps
        apiKey = { process.env.REACT_APP_GOOGLEAPI }
        center = { mapLocation }
        paths = {paths}
        point = {paths=>setState({paths})}
      />

      {
        paths && paths.length >1
        ?
        <button ref={btnRef} onClick={saveMap}>Save Map</button>
        : null
      }
    </div>
  )
}

export default AddGeoMap