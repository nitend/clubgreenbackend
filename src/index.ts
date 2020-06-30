import 'dotenv/config'
import 'reflect-metadata'
import express from "express";
import cookieParser from 'cookie-parser';
import {usermanager} from './usermanagement/usermanager'
import cors from 'cors'
import {imgUpload} from './imageHandling/imageUploader'
import { getNodes } from './imageHandling/UploadNodes';

import { ProductResolver } from './resolver/ProductResolver';
import { PaymentResolver } from './payment/PaymentResolver';
import { RatingResolver } from './resolver/RatingResolver';
import { SightResolver } from './resolver/SightsResolver';
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import { BookingResolver } from './resolver/BookingResolver';
import { PropertyResolver } from './resolver/PropertyResolver';
import { UserResolver } from "./resolver/UserResolver";


(async () => { 
    const app = express(); 
    app.use(cookieParser());
    
   
    app.use(cors({
        origin: process.env.CORS_DOMAIN_ALLOWED,
        credentials: true
    }))


    app.use(express.static('public'));
    usermanager(app)

    app.post('/upload/property/image', );

    /*
    app.get("/", (req, res) => {
        console.log(req)
        res.send("ready + env: DB " + process.env.COSMOS_DB_URL)
    })
    */

    imgUpload(app, getNodes())

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                UserResolver, 
                BookingResolver, 
                PropertyResolver,
                RatingResolver,
                SightResolver,
                ProductResolver,
                PaymentResolver
            ]
        }),
        context: ({req, res}) => ({req, res})
    });
    
    apolloServer.applyMiddleware({app, cors: false});
  
   const port = process.env.PORT || 80;
    app.listen(port, () => {
        console.log('Server is listening on Port ' + port)
    })
})()
