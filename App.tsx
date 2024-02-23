import React, {useState,useEffect} from 'react';
import './App.css';
import SearchMovie from './components/SearchMovie';
import Favorite from './components/Favorite';
import ShowMovieDetail from './components/ShowMovieDetail';
import IMovieList from './models/IMovieList';
import { getDataFromServer } from './services/ItemService';


function App() {
  const [searchParam, setSearchParam] = useState("");
  const [error,setError] = useState<Error|null>(null);
  const [filteredData, setFilteredData] = useState<IMovieList[]|null>(null);
  const [favItems, setFavItems] = useState<string[]>([]);
  const [isOpen, setOpen]= useState(false);
  const [movie, setMovie] = useState<IMovieList|null>(null);
  const [favItemList, setFavItemList] = useState<IMovieList[]|null>(null);

  const handleInputChange = (event:any) => {
    const { value } = event.target;
     setSearchParam(value);
  };

  useEffect(() => {
    const fetchItem = async() => {
        try{
          if(searchParam=== "favorites"){
            console.log(favItemList);
            setFilteredData(favItemList);
          }else if(searchParam!== "" ){
              const data= await getDataFromServer(searchParam);
              setFilteredData(data);
          }
        } catch( error:any){
            setError(error);
        }
    }
    fetchItem();
  }
    ,[searchParam,favItemList]);

    const onAdd = (product:string) => {
      const exist = favItems.find((x) => x === product);
      if(!exist){
      setFavItems([...favItems, product]);
      const searchFavItem= filteredData!=null ? filteredData.filter((item)=>item.title===product) : [];
      const favItemData= favItemList!=null ? [...favItemList,...searchFavItem] : searchFavItem ;
      setFavItemList(favItemData);
       } else {
        alert('Movie already in the favorite list.');
      }
   };
    
    const onRemove = (product:string) => {
       setFavItems(favItems.filter((x) => x !== product) );
       const searchFavItem = filteredData!=null ? filteredData.filter((item)=>item.title!==product) : [];
       setFavItemList(searchFavItem);
    };
    
    const onOpen = (data:IMovieList) => {
      setMovie(data);
      setOpen(true);
      
   };
   const onClose = (arg:boolean) => {
     setOpen(arg);
   };
   return (
    <>
    <div className="App'">
      <div id='page-Header'>Movies On The Tip</div>
    <div className='my-menu'>
      <select name="movieType" id="movieType" value={searchParam} 
        onChange={handleInputChange} >
             <option value="DEFAULT">Choose a movie type ...</option>
             <option value="movies-coming">movies coming</option>
             <option value="movies-in-theaters">movies in theaters</option>
             <option value="top-rated-india">top rated india</option>
             <option value="top-rated-movies">top rated movies</option>
             <option value="favorites">favorites</option>
         </select>
   
    </div>
    {(searchParam !== "" && (filteredData?.length===0) ) && <h2>No Data to display for the selected movie type.</h2>}
    {(filteredData && filteredData.length>0 ) &&
    <div className = "row">
      <div className="one">
       <SearchMovie movies={filteredData}  onAdd={onAdd} onOpen= {onOpen} />
      </div>
      <div className='two'>
        <Favorite
        favItems={favItems}
        onRemove={onRemove} />
      </div>
      </div>}
         {error && <> {error?.message} </>  }  
      </div>
       {isOpen && <ShowMovieDetail data= {movie} onClose={onClose}/>}
  </>

  );
}

export default App;
