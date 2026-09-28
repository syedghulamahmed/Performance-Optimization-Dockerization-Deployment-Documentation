import "dotenv/config";
export const config={port:Number(process.env.PORT||4000),databaseUrl:process.env.DATABASE_URL||"",jwtSecret:process.env.JWT_SECRET||"development-only-secret",corsOrigin:process.env.CORS_ORIGIN||"http://localhost:5173",uploadDir:process.env.UPLOAD_DIR||"./storage"};
if(!config.databaseUrl)throw new Error("DATABASE_URL is required");
if(process.env.NODE_ENV==="production"&&config.jwtSecret==="development-only-secret")throw new Error("JWT_SECRET must be set in production");
