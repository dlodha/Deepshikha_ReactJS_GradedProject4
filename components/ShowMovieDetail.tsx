import ReactDOM from "react-dom";
import IMovieList from "../models/IMovieList";

type Props = {
    data:IMovieList|null,
    onClose:(arg:boolean) => void
}
export default function ShowMovieDetail(props:Props) {
    const{data,onClose} =props;
    const el = document.createElement('div');
    document.getElementById('dialog')?.appendChild(el);
   
    return (
       ReactDOM.createPortal(
            <div id="details-page">
                <p>Movie Details:</p>
                <div className="page">Title: {data?.title} </div>
                <div className="page">Actors: {data?.actors} </div>
                <div className="page">AverageRating: {data?.averageRating} </div>
                <div className="page">ContentRating: {data?.contentRating} </div>
                <div className="page">Duration: {data?.duration} </div>
                <div className="page">Genre: {data?.genres} </div>
                <div className="page">ReleaseDate: {data?.releaseDate} </div>
                <div className="page">Storyline: {data?.storyline} </div>
                <div className="page">ImdbRating: {data?.imdbRating} </div> 
                <div className="page">Rating: {data?.ratings} </div>    
                <button onClick={()=>onClose(false)} >Close</button>          
            </div>,el)
    );
}


