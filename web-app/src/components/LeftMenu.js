import React from "react"
function LeftMenu(props){
    const type = props.nType
    return (
        <div className="left">
            <div className="list">
                {console.log(props.nType)}
                <div className={`${type ==='notification' ? "active" : ""}`} onClick={()=>props.setNType("notification") } >Notification</div>
                <div className={`${type ==='alert' ? "active" : ""}`} onClick={()=>props.setNType("alert")}>Alert</div>
                <div className={`${type ==='result' ? "active" : ""}`} onClick={()=>props.setNType("result")}>Result</div>
                <div className={`${type ==='classes' ? "active" : ""}`} onClick={()=>props.setNType("classes")}>Classes</div>
                <div className={`${type ==='previousresult' ? "active" : ""}`} onClick={()=>props.setNType("previousresult")}>Previous Result</div>
                <div className={`${type ==='timetable' ? "active" : ""}`} onClick={()=>props.setNType("timetable")}>Time Table</div>

                
            </div>
        </div>
    );
}

export default LeftMenu