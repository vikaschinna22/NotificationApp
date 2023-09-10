import multer from "multer";
import {db} from '../db.js'
import fs from 'fs'
import { promisify } from "util";

export function notificationFile(req,res){
  // const user = rew.session.user;
  // if(user.role)
  if(!(req.session?.user) || req.session.user.role !=='admin'){
    res.status(401).json("unauthorized")
    return ;
  }
  console.log(req.body)
  const id = `n_${Date.now()}`;
  const isactive = true;
  const time = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
  const storage= multer.diskStorage({
      destination:(rq,file,cb)=>{
        cb(null,'./uploads')
      },
      filename:(rq,file,cb)=>{
        cb(null, `${id}.pdf`)
      }
    })
    const up = multer({
      storage:storage,
      fileFilter:(rq,file,cb)=>{
        if(file.mimetype=='application/pdf') cb(null,true);
        else{cb(new Error("failed"),false)}
      }
    }).single('file')
      // {name:name,file:file}
    console.log('type result')
    up(req, res, (err) => {
        console.log(req.body)
        if(err){
            console.log(err);
            res.json({error:"error"});
        }else{
            console.log("api called")
            const flink = `/uploads/${id}.pdf`
            const name = req.body.name;
            const type = req.body.type
            const q = 'insert into  notification values(?,?,?,?,?,?,?)'; 
            db.query(q,[id,type,flink,name,time,isactive,null],(err,result)=>{
              if(err)console.log(err);
                res.status(200).send("success");
            })
        }
    })   
}


export function notificationLink(req,res){
  // console.log(req.session.user)
  // console.log(req.session.user.role)
  if(!(req.session?.user) || req.session.user.role !=='admin'){
    res.status(401).json("unauthorized")
    return ;
  }
  console.log('link')
  const id = `n_${Date.now()}`;
  const type = req.body.type
  const flink = null
  const name = req.body.name
  const time = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
  const isactive = true;
  const link = req.body.link
  const q = 'insert into  notification values(?,?,?,?,?,?,?)'; 
  db.query(q,[id,type,flink,name,time,isactive,link],(err,result)=>{
    if(err){
          console.log(err)
          res.send({error:err})
      };
        res.status(200).send("success");
  })
}
export function showPdf(req,res){
  let files = fs.readdirSync('./uploads');
  if(!files.includes(req.params.id)){
    console.log(req.params.id)
    res.status(404).send('file not found')
    return
  }
  var data =fs.readFileSync(`./uploads/${req.params.id}`);
  res.contentType("application/pdf");
  res.send(data)
  // console.log('pdf')
  // res.download('./uploads/example.pdf')
}


export function deleteNotification(req,res){
  if(!(req.session?.user) || req.session.user.role !=='admin'){
    res.status(401).json("unauthorized")
    return ;
  }
    const  id = req.body.id;
    const type = req.body.type;
    console.log(id,type)
    const q = 'delete from notification where id = ?'
    db.query(q,[id],async(err,result)=>{
      if(err){
        console.log(err);
        res.send(err)
        return err;
      }
      if(type !=='results'){
        const rmfile = promisify(fs.unlink)
        await rmfile(`./uploads/${id}.pdf`)
      }
      res.status(200).send("successfully deleted")
    })
  }
  //---------------  edit 
  export function editNotification(req,res){

    if(!(req.session?.user) || req.session.user.role !=='admin'){
      res.status(401).json("unauthorized")
      return ;
    }

    // const id = `n_${Date.now()}`
    const storage= multer.diskStorage({
      destination:(rq,file,cb)=>{
        cb(null,'./uploads')
      },
      filename:(rq,file,cb)=>{
        cb(null, `${req.body.id}.pdf`)
      }
    })
    const up = multer({
      storage:storage,
      fileFilter: async(rq,file,cb)=>{
        // const filePath = `./uploads/${req.body.id}.pdf`
        // if (fs.existsSync(filePath)) {
        //   const rmfile = promisify(fs.unlink)
        //   await rmfile(filePath)
        // }
        let files = fs.readdirSync('./uploads');
        if(files.includes(`${req.body.id}.pdf`)){
            fs.unlinkSync(`./uploads/${req.body.id}.pdf`);
        }
         if(file.mimetype=='application/pdf') cb(null,true);
        else{cb(new Error("failed"),false)}
      }
    }).single('file')
    // up.fileFilter(async (rq, file, cb) => {
    //     const filePath = `./uploads/${req.body.id}.pdf`;
    //     if (fs.existsSync(filePath)) {
    //       const rmfile = promisify(fs.unlink);
    //       await rmfile(filePath);
    //       cb(null, true);
    //     } else if (file.mimetype == 'application/pdf') {
    //       cb(null, true);
    //     } else {
    //       cb(new Error('failed'), false);
    //     }
    //   }
    // )
    up(req,res,(err)=>{
      if(err){
        console.log(err);
        res.status(500).send(" something happend try again")
        return
      }
      const id = req.body.id;
      const text = req.body.text;
      if(req.body.link == 'null'){
        console.log( 121, req.body)
        const q = 'update notification set text = ? where id = ?;'
        db.query(q,[text,id],(err)=>{
            if(err){
              res.status(400)
              return;
            }
            res.send('sucess')
        })
      }else{
        console.log(135,req.body)
        const link = req.body.link
        const q = 'update notification set link=?, text =? where id = ?;'
        db.query(q,[link,text,id],(err)=>{
          if(err){
            res.status(400).send("something happend")
            return
          }
          res.send('successfully updated')
        })
       
      }
    })
}


//get Notification
export function getData(req,res){
  // var head=req.headers['authorization'];
  //   console.log(req.headers)
  // console.log(req.user);
  const type = req.params.id;
  console.log(type)
  const q = 'select * from notification where type=? and active=1;'
  db.query(q,[type],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).send(err)
      return;
    }
    res.json({data:result,type:type})
  })
}
export function getNotification(req,res){
  if(!(req.session?.user) || req.session.user.role !=='admin'){
    res.status(401).json("unauthorized")
    return ;
  }
  // console.log("getnotification")
  console.log(req.session.user.role)
  const q = 'select * from notification;'
  db.query(q,(err,result)=>{
    if(err){
        res.json({error:err})
        return;
    }
    // console.log(result);
    res.json(result);
  })
}


/// change active 
export function changeActive(req,res){
  if(!(req.session?.user) || req.session.user.role !=='admin'){
    res.status(401).json("unauthorized")
    return ;
  }
  console.log(req.body)
  const id = req.body.id;
  const active = req.body.active
  const q = "update notification set active=? where id = ?;"
  db.query(q,[active,id],(err)=>{
    if(err){
      res.status(400).send("something happend")
      return
    }
    res.send("success")
  })
}

