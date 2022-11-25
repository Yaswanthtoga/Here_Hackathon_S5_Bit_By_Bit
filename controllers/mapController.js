const db = require('../db');
const express = require('express');

module.exports.addName =  (req,res)=>{
    const  name = req.body.name;
    const  checkName = "SELECT placename FROM storeplaces WHERE name='?'";
    db.query(checkName,name,(err,response)=>{
        if(response){
            res.status(404).json({msg:"This Place is Already in the List"});
        }else{
            db.query("INSERT INTO storeplaces(placename) VALUES(?)",name,(err,result)=>{
                if(err){
                    console.log(err.message);
                }
                
                if(result){
                    res.status(200).json({msg:"Place Added Succesfully"});
                }else{
                    res.status(400).json({msg:"Something Went Wrong"});
                }
            })
        }
    })
}

module.exports.getMapInfo = (req,res)=>{
    const name = req.body.name;
    const sql = "SELECT * FROM storeplaces WHERE placename='?'";

    db.query(sql,name,(err,result)=>{
        if(result){
            res.status(200).json({result});
        }else{
            res.status(400).json({msg:"Something Went Wrong"});
        }
    })
}

module.exports.addMap = (req,res)=>{
    const parentid = req.body.parentid;
    const coordinates = req.body.coordinates

    const sqlQuery = "INSERT INTO storepolygon (id,parentId,coordinates) VALUES (id,?,?)";

    db.query(sqlQuery,[parentid,coordinates],(err,result)=>{
        if(err){
            res.status(400).json({msg:"This map already exits"});
        }

        if(result){
            res.status(200).json({msg:"Polygon added Successfully"});
        }
    })
}