import { PrismaClient } from "@prisma/client";
import axios from "axios";
import express, { Express, Request, Response } from "express";
const config = require("../../config/workflow/config.json");
import {workflows_templates,parent_tasks,wb_task_table} from "../../config/workflow/wb_mappings.json";
import { axiosGetFields,axiosGetRecords,axiosGetQueryRecords } from "../../controllers/axiosController";
const APP_ENV = process.env.APP_ENV
const QB_USER_TOKEN = process.env.QB_USER_TOKEN
const prisma = new PrismaClient();
export const getQBDataforSpecificTable= async (tableKeys: Object,qbTableId: Object,integration_type:any)=>{
    try {
        const getData = await getQBFieldsandData(qbTableId,tableKeys,integration_type);
        // console.log(getData)
        return getData;
      } catch (error) {
        console.log('error',error);
        return error;
      }
  }
export const getQBTableId=async (tableIdKey:string)=>{
    var tableIdValue=''
    await Object.keys(config.quickbase[APP_ENV]).map(function(key, index) {
        if (key === tableIdKey){
          tableIdValue= config.quickbase[APP_ENV][key];
        }  
      });
      // console.log('table',tableIdValue)
    return tableIdValue;   
  }
const getQBFieldsandData:any=async (tableId:object,tableKeys: any, integration_type:any) => {
    try {
      const response=await axiosGetFields(tableId);
      var columnsIdsMap=new Map();
      let columnIdsArray=[];
      for (const key of tableKeys){
        for(const getData of response){
          if(key === getData.label){
            columnsIdsMap.set(key,getData.id)
            columnIdsArray.push('"'+getData.id+'"')
          }
        }
      }
      // return columnsIdsMap
      const projectTypeColumnIndex=columnsIdsMap.get("Project Type")
      let fetchRcrdsQuery=`{"from":"${tableId}",
        "select":[${columnIdsArray.join(',')}],
        "where":"{${projectTypeColumnIndex}.EX.${integration_type}}"
      }`
    console.log('fetched query',fetchRcrdsQuery)
      const responseqbFetchConfig= await axiosGetQueryRecords(fetchRcrdsQuery)
      console.log('axios call response',responseqbFetchConfig.data)
      let responseArray=new Array;
      responseqbFetchConfig.data.forEach(function async(row : any){
        let fieldsArray=new Map;
          for(const key in row)
          {
              let val=row[key].value
              fieldsArray.set(getKeyByValue(columnsIdsMap,key),val) 
          }
          responseArray.push(fieldsArray);
      })
      return responseArray;
    } catch (error) {
      console.log('error',error);
      return error;
    }
  }
function getKeyByValue (map:any, value:any) {
    for (let [key, val] of map) {
            if (val == value)
            return key;
    }
  }
  
