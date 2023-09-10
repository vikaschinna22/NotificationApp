import axios from "axios"
import React from "react"
function Edit(props){
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const type = props.target.type;
        const text = e.target[0].value
        const t = document.getElementById('link')
        const link = t?t.value:null
        // console.log(type,text,link)
        const data = new FormData()
        console.log(props.target)
        data.append('id',props.target.id)
        data.append('type',type)
        data.append('text',text)
        data.append('link',link)
        data.append('active',props.target.active)
        const len = document.getElementById('file')?.files.length
        if(len > 0){
            const file = e.target[1].files[0]
            data.append('file',file)
            console.log(21,data)
        }
         
        try{
            const res = await axios.post('/updatedata',data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials:true
            })
            console.log(res.data)
            handleClose()
        }catch(err){
            console.log(err)
        }
    }
    const handleClose = () =>{
        // console.log('hello',file)
        props.setShowEdit(false)
        props.setEditObj(false)
        
    }
    // console.log(props.target)
    return (
        <div className="edit-wrapper">
            
            <div className="edit-container">
                <div>
                    <button onClick={handleClose } className = 'close'><span class="close-btn">+</span></button>
                </div>
                <div className="form-wrapper">
                    <form onSubmit={(e) =>handleSubmit(e)}>
                        <div className="form-element">
                            <label>Notification Type : <strong>{props.target.type}</strong></label>
                        </div>
                        <div className="form-element">
                            <label htmlFor="text">Text for Notification link:</label>
                            <input type='text' id='text' defaultValue={props.target.text}  />
                        </div>
                        {props.target.type !=='results'
                            &&
                            <div className="form-element">
                                <label htmlFor="file">choose file to upload:</label>
                                <input type='file' id='file'  />
                            </div> }
                            {props.target.type === 'results' &&
                            <div className="form-element">
                                <label htmlFor="link">Link:</label>
                                <input type="text" id="link" defaultValue={props.target.link}   />
                            </div>
                        }
                        <div className="btn">
                            <button type="submit">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Edit