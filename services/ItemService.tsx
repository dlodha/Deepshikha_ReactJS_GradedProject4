import axios from "axios";
import React from "react";
import IMovieList from "../models/IMovieList";

export const getDataFromServer= (props:string) =>
{
    let getUrl:string= 'http://localhost:4001/'+ props;
    
    return axios.get<IMovieList[]>(getUrl).then(response=>response.data);
}
