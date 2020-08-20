module.exports = validate = (req, res, next)=>{
    if(req.header('pw')==='456'){
        next();
    }else{
        res.send('Access denied')
    }
}