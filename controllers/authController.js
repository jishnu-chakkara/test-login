import {hashPassword}  from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from 'jsonwebtoken'


const registerController = async (req,res)=>{

    try {
        const {name,email,password,phone,address} = req.body
        // vailations
        if(!name){
            return res.send({error: 'Name is Required'})
        }
        if(!email){
            return res.send({error: 'Email is Required'})
        }
        if(!password){
            return res.send({error: 'Password is Required'})
        }
        if(!phone){
            return res.send({error: 'Phone is Required'})
        }
        if(!address){
            return res.send({error: 'address is Required'})
        }
        //check user
        const existingUser = await  userModels.findOne({email})
        //existing user check
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"u registoer please login"
            })


        }
        //registor user
        const hashedPassword = await hashPassword(password)
        //save 
        const user =new userModels({name,email,phone,address,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:"midssion completed"
            

        })


        
    } catch (error) {
        console.log("erorr")
        res.status(500).send({
            success:false,
            message:'erorr on reg'
        

        })
        
    }

}
//post login
export const loginController = async(req,res) =>{
    try {
        const {email,password} =req.body
        //vaildation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'account not found'
            })
        }
        //check user
        const user = await userModels.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'email not found'
            })

        }

        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'invaild password'
            })
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:'login success',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address


            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'login faild ',
            error
        })
    }

};

export  {registerController};