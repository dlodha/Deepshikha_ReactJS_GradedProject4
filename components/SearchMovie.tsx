import React,{useState,useEffect} from 'react';
import IMovieList  from '../models/IMovieList';
import ReactPaginate from "react-paginate";

type Props={
  movies:IMovieList[]|null,
  onAdd:(arg:string) => void,
  onOpen:(arg:IMovieList) => void
  
}
export default function SearchMovie (props:Props) {
    const {movies ,onAdd, onOpen} =props;
    const [currentImages, setCurrentImages] = useState<IMovieList[]|null>(null);
    const [pageCount, setPageCount] = useState(0);
    const [imagesOffset, setImagesOffset] = useState(0);
    
   
  const handleRowClick = (event:any, searchId:string) => { 
    const details = movies!=null ? movies.filter((item) => item.id===searchId) : [];
    onOpen(details[0]);
  };
  
const renderMovie = (movie:IMovieList) => {
  return (
  <>
     <tr key={movie.id} id={movie.id} onClick={(e) => handleRowClick(e, movie.id)} className="movieData">
        <td ><img className="small" src={movie.posterurl} alt={movie.title} /></td>
        <td >{movie.actors}</td>
        <td >{movie.genres}</td>
        <td >{movie.imdbRating}</td>
    </tr>
   
      <button className='add-to-cart' onClick={() => onAdd(movie.title)}>Add To Favorite</button>
    </>
  );
}
const handlePageClick = (event:any) => {
      const newOffset = movies!=null ? (event.selected * 5) % movies.length : 1 ;
      setImagesOffset(newOffset);
  };
  
 const getHeaders = () => {
      return (
          <>
          <th className=" header-color">Movie-Poster</th>
          <th className=" header-color">Actors</th>
          <th className=" header-color">Genres</th>
          <th className="header-color">ImbdRating</th>
          
          </>
      )
  }
  useEffect(() => {
      const endOffset = imagesOffset + 5;
      setCurrentImages(movies!=null ? movies.slice(imagesOffset, endOffset) : [] );
      setPageCount(movies!=null ? Math.ceil(movies.length / 5) : 1);
    }, [movies, imagesOffset]);


  return (
    <>
    <div>
      <div className="pagination">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"} />
    </div><table>
      <tbody>
        <tr>{getHeaders()}</tr>

        {currentImages && currentImages.map((item) => renderMovie(item))}
        </tbody>
      </table>             
    </div> 
    </>
  );
};

