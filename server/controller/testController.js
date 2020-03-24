const testModel = require("../model/testModel");

exports.index = async (req, res)=>{
    try{
        let test_all = await testModel.all();
        res.send(test_all);
    }catch(e){
        console.log(e);
    }
}