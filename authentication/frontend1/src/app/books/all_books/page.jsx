import {useState} from 'react'
import axios from "axios"
import API from "../../../api/api.js"



export default function AllBooks() {

  const [allBook , setAllBook] = useState([])

  const featchAllBook = async ()=>{
    const res = await axios.get(
      `${API}`
    )
  }

  return (
    <>
      
    </>
  );
}
