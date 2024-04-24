import React,{useState, useEffect} from 'react'
import Cards from '../components/Cards/Cards';
import InputGroup from '../components/Filters/Category/InputGroup';

const Location = () => {
  let [id, setId] = useState(1);
  let [info, setInfo] = useState([]);
  let {name, type, dimension} = info;
  let [results, setResults] = useState([])

  let api = `https://rickandmortyapi.com/api/location/${id}`

  useEffect(()=>{
    (async function(){
      let data = await fetch(api).then(res=>res.json());
      setInfo(data);
      let a = await Promise.all(
        data.residents.map(async (x)=>{
          const res = await fetch(x);
          return await res.json();
        })
      );
      setResults(a);
    })()
  },[api]);

  return (
    <div className="Location">
      <h1 className="text-center mb-4">Location: 
        <span className='text-primary'> {name === "" ? 'Unknown' : name}</span>
      </h1>
      <h5 className='text-center'>
          Dimension: {dimension === "" ? 'Unknown' : dimension}
      </h5>
      <h6 className='text-center'>
          Type: {type === "" ? 'Unknown' : type}
      </h6>
      <div className="container">
        <div  style={{padding : '20px'}} className='row'>
          <div className='col-3'>
            <h4 className='text-center fw-bold fs-4 mb-2'>Pick Location</h4>
              <InputGroup setId={setId} name='Location' total={126}/>
          </div>
          <div className='col-8'>
            <div className='row'>
              <Cards page='/location/' results={results}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location
