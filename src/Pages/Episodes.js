import React,{useState, useEffect} from 'react'
import Cards from '../components/Cards/Cards';
import InputGroup from '../components/Filters/Category/InputGroup';

const Episodes = () => {
  let [id, setId] = useState(1);
  let [info, setInfo] = useState([]);
  let {air_date, name} = info;
  let [results, setResults] = useState([])

  let api = `https://rickandmortyapi.com/api/episode/${id}`

  useEffect(()=>{
    (async function(){
      let data = await fetch(api).then(res=>res.json());
      setInfo(data);
      let a = await Promise.all(
        data.characters.map(async (x)=>{
          const res = await fetch(x);
          return await res.json();
        })
      );
      setResults(a);
    })()
  },[api]);

  return (
    <div className="Episode">
      <h1 className="text-center mb-4">Episode: 
        <span className='text-primary'> {name === "" ? 'Unknown' : name}</span>
      </h1>
      <h5 className='text-center'>
          Air Date {air_date === "" ? 'Unknown' : air_date}
      </h5>
      <div className="container">
        <div  style={{padding : '20px'}} className='row'>
          <div className='col-3'>
            <h4 className='text-center fw-bold fs-4 mb-2'>Pick Episodes</h4>
              <InputGroup setId={setId} name={'Episode '} total={51}/>
          </div>
          <div className='col-8'>
            <div className='row'>
              <Cards page='/episodes/' results={results}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Episodes
