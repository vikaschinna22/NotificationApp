import axios from "axios";
import React  from "react";

function RightMenu(props){
    // const [error,setError] = useState
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const text = e.target[0].value
        const link = e.target[1].value
        console.log(text,link)
        if(props.nType === 'result' || props.nType === 'previousresult'){
            console.log('results')
            try{
                const data = {
                    type:props.nType,
                    name:text,
                    link
                }
                const res = await axios.post('/notificationlink',data)
                console.log(res)
            }catch(err){
                console.log(err)
                return ;
            }
        }else{
            const text = e.target[0].value
            const file = e.target[1].files[0]
            console.log(props.nType)
            try{
                const data = new FormData()
                data.append('file',file)
                data.append('type',props.nType)
                data.append('name',text)
                const res = await axios.post('/notificationfile',data,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        e.target.reset()   
    }

    return (
        <div className="right">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-element">
                        <label>Notification Type : </label>
                        <strong>{props.nType.toUpperCase()}</strong>
                    </div>
                    <div className="form-element">
                        <label htmlFor="text">Text for Notification link:</label>
                        <input type='text' id='text'  required />
                    </div>
                    {props.nType !=='result' && props.nType!=='previousresult'
                        &&
                        <div className="form-element">
                            <label htmlFor="file">choose file to upload:</label>
                            <input type='file' id='file' required />
                        </div> }
                        {(props.nType === 'result' || props.nType==='previousresult') &&
                        <div className="form-element">
                            <label htmlFor="link">Link:</label>
                            <input type="text" id="link"  required  />
                        </div>
                    }
                    <div className="btn">
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RightMenu;