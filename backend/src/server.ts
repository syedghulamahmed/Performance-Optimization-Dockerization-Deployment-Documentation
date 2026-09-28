import express from "express";import cors from "cors";import helmet from "helmet";import swaggerUi from "swagger-ui-express";import {config} from "./config";import routes from "./routes";import {openapi} from "./openapi";
const app=express();app.disable("x-powered-by");app.use(helmet());app.use(cors({origin:config.corsOrigin,credentials:true}));app.use(express.json({limit:"100kb"}));
app.use((req,res,next)=>{const start=process.hrtime.bigint();res.on("finish",()=>{const ms=Number(process.hrtime.bigint()-start)/1e6;console.log(JSON.stringify({ts:new Date().toISOString(),method:req.method,path:req.path,status:res.statusCode,durationMs:Number(ms.toFixed(2))}))});next()});
app.get("/health",async(_req,res)=>res.status(200).json({status:"ok",service:"talentbridge-api"}));
app.get("/openapi.json",(_req,res)=>res.json(openapi));app.use("/docs",swaggerUi.serve,swaggerUi.setup(openapi));app.use("/api",routes);
app.use((err:any,_req:any,res:any,_next:any)=>{console.error(JSON.stringify({level:"error",message:err?.message||"Unexpected error"}));res.status(500).json({error:{code:"INTERNAL_ERROR",message:"Unexpected server error"}})});
app.listen(config.port,()=>console.log(JSON.stringify({level:"info",message:"API listening",port:config.port})));
