import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Filters from "./components/Filters/Filters";
import Cards from "./components/Cards/Cards";
import Pagination from "./components/Pagination/Pagination";
import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import CardDetails from "./components/Cards/CardDetails";

function App(){
  return(
  <Router>
    <div className="App">
      <Navbar/>
    </div>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/:id' element={<CardDetails/>}></Route>

      <Route path='/episodes' element={<Episodes/>}></Route>
      <Route path='/episodes/:id' element={<CardDetails/>}></Route>

      <Route path='/location' element={<Location/>}></Route>
      <Route path='/location/:id' element={<CardDetails/>}></Route>
    </Routes>
  </Router>)
}

const Home=()=> {
  let [pageNumber, setPageNumber] = useState(1); 
  let [search, setSearch] = useState("");
  let [status, setStatus] = useState("");
  let [gender, setGender] = useState("");
  let [species, setSpecies] = useState("");
  //Evento que actualiza la páginan
  let [fetchedData, updateFetchData] = useState([]); 
  let {info, results} = fetchedData;

  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  useEffect(() =>{ //función que se actualiza automáticamente tras actualizar el pageNumber
    (async function(){
      let data = await fetch(api).then(res=>res.json());
      updateFetchData(data);
    })()
  },[api])

  return (
    <div className="App">
      <h1 className="text-center mb-4">Characters</h1>
        <Search setPageNumber={setPageNumber} setSearch={setSearch} />
      <div className="container">
        <div className="row">
          <Filters 
          setSpecies={setSpecies}
          setStatus={setStatus} 
          setPageNumber={setPageNumber} 
          setGender={setGender} /> 
          <div className="col-8">
            <div className="row">
              <Cards page='/' results={results} />
            </div>  
          </div> 
        </div>
      </div>
      <Pagination info={info} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      <h1>Juanse</h1>
    </div>
  );
}

export default App;
