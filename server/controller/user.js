
const myusername = 'user@mail.com'
const mypassword = 'qwerty'

export function getUser(req,res){
    if(req.session?.user){
        const data = {isauth:true , user:req.session.user}
        console.log(data)
        res.json(data);
    }
    else
        res.json({isauth:false})
}

export function login(req,res){
    const username = req.body.username
    const password = req.body.password
    console.log(username,password)
    if(username===myusername && password === mypassword){
        // const user = {user:username,role:'admin'}
        const user = {user:username,role:'admin'}

      req.session.user = user
      res.status(200).send({isauth:true,user:user});
      return;
    }
    res.status(403).send({isauth:false})
}
export function logout(req,res){
    req.session.destroy();
    res.send("sucess")
}

  