import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const CardDetails = () => {
    let {id} = useParams();
    let [fetchedData, updateFetchData] = useState([]); 
    let {name, image, origin, location, gender, species, status, type} = fetchedData

    let api= `https://rickandmortyapi.com/api/character/${id}`
    useEffect(() =>{ //función que se actualiza automáticamente tras actualizar el pageNumber
        (async function(){
          let data = await fetch(api).then(res=>res.json());
          updateFetchData(data);
        })()
      },[api])
    return (
        <div className='container d-flex justify-content-center '>
            <div className='d-flex flex-column gap-2'>
                <h1 className='text-center'>{name}</h1>
                <img src={image} alt='' className='img-fluid '></img>
                {(()=>{
                    if(status === 'Dead'){
                        return(
                            <div className={'badge bg-danger fs-5'}>
                                {status}
                            </div>
                        )
                    }
                    else if(status === 'Alive'){
                        return(
                            <div className={'badge bg-success fs-5'}>
                                {status}
                            </div>
                        )
                    }else {
                        return(
                            <div className={'badge bg-secondary fs-5'}>
                                {status}
                            </div>
                        )
                    }
                })()}
                <div className='content'>
                    <span className='fw-bold'>
                        Gender: 
                    </span> {gender}
                </div>
                <div className='content'>
                    <span className='fw-bold'>
                        Species: 
                    </span> {species}
                </div>
                <div className='content'>
                    <span className='fw-bold'>
                        Type: 
                    </span> {type === '' ? 'Unknown' : type}
                </div>
                <div className='content'>
                    <span className='fw-bold'>
                        Location: 
                    </span> {location?.name}
                </div>
                <div className='content'>
                    <span className='fw-bold'>
                        Origin: 
                    </span> {origin?.name}
                </div>
                
            </div>
        </div>
    )
}

export default CardDetails
