export function notifcation(req,res){
    if(!(req.session?.user)){
      res.status(401).json("unauthorized")
    }
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
            res.status(500).json({error:"error"});
            return
        }
        if(req.body.link == 'null'){
            console.log("api called")
            const flink = `/uploads/${id}.pdf`
            const name = req.body.name;
            const type = req.body.type
            const q = 'insert into  notification values(?,?,?,?,?,?,?)'; 
            db.query(q,[id,type,flink,name,time,isactive,null],(err,result)=>{
                if(err)console.log(err);
                res.status(200).send("success");
            })
        }else{
            const name = req.body.name
            const type = req.body.type
            const flink = null
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

    })
}