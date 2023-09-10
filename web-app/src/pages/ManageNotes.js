import axios from "axios";
import React, { useEffect, useState } from "react"
import Edit from "../components/Edit";

export default function ManageNotes(){
    const [notes,setNotes] = useState([])
    const [filteredNotes,setFilteredNotes] = useState([])
    const [showEdit,setShowEdit] = useState(false)
    const [editObj,setEditObj] = useState(null)
    useEffect(()=>{
        const unsub = async() =>{
            axios.get('/notification').then((res)=>{
                setNotes(res.data)
                const f = 'all'
                const l = res.data.filter((obj)=>{
                    if(f==='all')return true;
                    else return obj.type === f
                })
                setFilteredNotes(l)
            }).catch((err)=>console.log(err))
        }
        return ()=>{
            unsub();
        }
    },[showEdit])
    const handleDelete = (id,type)=>{
        console.log(id,type)
        axios.post('/deletenotification',{id,type})
        .then(res=>{
            console.log(res)
            axios.get('/notification').then((res)=>{
                setNotes(res.data)
                console.log(res.data)
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    const handleEdit=(obj)=>{
        setEditObj(obj)
        setShowEdit(!showEdit)
    }
    const handleActive = (e,id) =>{
        // console.log(e.target.checked)
        try{
            const res = axios.put('/changeactive',{id,active:e.target.checked})
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    const handleFilter =(e)=>{
        console.log(e.target.value)
        const f = e.target.value
        const l = notes.filter((obj)=>{
            if(f==='all')return true;
            else return obj.type === f
        })
        setFilteredNotes(l)
    }
    return(
        <div className="noteswrapper">
            <div className="notescontainer">
            <div className="filter">
                <div>Filter </div>    
                <select onChange={handleFilter} id = 'filter'>
                    <option value="all">All</option>
                    <option value="notification">Notification</option>
                    <option value="results">Results</option>
                    <option value="alert">Alert</option>
                    <option value="previousresult">Previous Result</option>
                    <option value="timetable">Time Table</option>
                    <option value="classes">Classes</option>

                </select>
            </div>
            <table>   
                <thead>
                    <tr>
                       <th>Type</th>
                       <th>Name</th>
                       <th>Date</th>
                       <th>Active</th>
                       <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredNotes.map((row)=>{
                        // console.log(row)
                        const d = new Date(row.date).toISOString().split('T')[0];;
                        return ( 
                            <tr key={row.id}>
                                <td>{row.type}</td>
                                {/* {console.log(row.l)} */}
                                <td><a href = {row.file==null?row.link:axios.defaults.baseURL+row.file} target="_blank"  rel="noreferrer">{row.text}</a></td>
                                {/* <td>{row.date}</td> */}
                                <td>{String(d)}</td>
                                {/* {console.log(new Date(row.date))} */}
                                <td><input type="checkbox" onChange={(e)=>handleActive(e,row.id)} defaultChecked={row.active}/></td>
                                <td><button onClick={()=>handleEdit(row)}>Edit</button></td>
                               <td><button onClick={()=>handleDelete(row['id'],row['type'])}>Delete</button></td>
                            </tr>
                        )
                    })
                }
                
                </tbody>
            </table>
                {showEdit && <Edit target={editObj} setEditObj = {setEditObj} setShowEdit = {setShowEdit}/>}
            </div>
        </div>
    );
   
} 