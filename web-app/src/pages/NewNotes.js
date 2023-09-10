import React, { useState } from "react";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
const NewNotes=(props)=>{
    const [nType,setNType] = useState("notification")
    return (
        <div className="newnotes">
            <LeftMenu nType = {nType} setNType  = {setNType}/>
            <RightMenu nType={nType} setNType = {setNType}/>
        </div>
    )
}

export default NewNotes;