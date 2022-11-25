import React,{ useState } from 'react'
import { DrawingManager, GoogleMap,LoadScript,Marker,Polygon } from '@react-google-maps/api'
import '../App.css'
import { useRef } from 'react';
import { useCallback } from 'react';


const GeoMaps = ({apiKey,center,paths=[],point}) => {

    const [path,setPath] = useState(paths);
    const [state,setState] = useState({
        drawingMode: 'polygon'
    })
    const libraries = ['drawing']
    const options = {
        drawingControl: true,
        drawingControlOptions:{
            drawingMode:['Polygon']
        },
        polygonOptions:{
            fillColor: "#2196F3",
            strokeColor: "#2196F3",
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: true,
            editable:true,
            draggable:true,
            zindex:1
        }
    }

    const onPolygonComplete = React.useCallback(
        function onPolygonComplete(poly){
            const polyArray = poly.getPath().getArray();
            let paths=[];
            polyArray.forEach((path)=>{
                paths.push({lat:path.lat(),lng:path.lng()})
            })
            setPath(paths);
            point(path);
            poly.setMap(null);
        },
        [point]
    )

    const polygonRef = useRef(null);
    const listenerRef = useRef([]);

    const onEdit = useCallback(()=>{
        if(polygonRef.current){
            const nextPath = polygonRef.current.getPath().getArray().map(latlng=>{
                return {lat:latlng.lat(),lng:latlng.lng()}
            })
            setPath(nextPath);
            point(nextPath)
        }
    },[setPath,point]);

    const onLoad = useCallback(
        polygon=>{
            polygonRef.current = polygon;
            const path = polygon.getPath();
            listenerRef.current.push(
                path.addListener("set at",onEdit),
                path.addListener("insert at",onEdit),
                path.addListener("remove at",onEdit),
            )
        },[onEdit]
    )

    const onUnmount = useCallback(()=>{
        listenerRef.current.forEach(lis=>lis.remove())
        polygonRef.current = null;

    },[])


  return (
    <div className='App'>
        <LoadScript
            id = 'script-loader'
            googleMapsApiKey = {apiKey}
            libraries = {libraries}
            language = 'en'
            region = 'us'>

            <GoogleMap
                mapContainerClassName = 'appmap'
                center = {{lat:center.lat,lng:center.lng}}
                zoom = {12}>

                {
                    path.length ===0 || path.length ===1 || path.length ===2
                    ?
                    (
                        <DrawingManager
                            drawingMode = {state.drawingMode}
                            editable
                            options={options}
                            draggable
                            onPolygonComplete={onPolygonComplete}
                            onMouseUp = {onEdit}
                            onDragEnd = {onEdit}
                        />)
                        :
                        (
                            <Polygon
                                options={{
                                    fillColor:"#2196F3",
                                    strokeColor: "#2196f3",
                                    fillOpacity:0.5,
                                    strokeWeight:2
                                }}
                                editable
                                path={path}
                                onLoad = {onLoad}
                                onUnmount={onUnmount}
                            />
                        )
                }

                <Marker position={{lat:center.lat,lng:center.lng}}/>

                
            </GoogleMap>
        </LoadScript>
    </div>
  )
}

export default GeoMaps