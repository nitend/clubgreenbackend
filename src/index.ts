import 'dotenv/config'
import 'reflect-metadata'
import { UserResolver } from "./usermanagement/UserResolver";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import {usermanager} from './usermanagement/usermanager'
import cors from 'cors'
import { BookingResolver } from './booking/BookingResolver';
import { PropertyResolver } from './properties/PropertyResolver';
import {imgUpload} from './imageHandling/imageUploader'
import { CRUDPropertyResolver } from './properties/CRUDPropertyResolver';
import { CRUDSightsResolver } from './sights/CRUDSightsResolver';
import { CRUDRatingResolver } from './rating/CRUDRatingResolver';
import { ExtendedRatingResolver } from './rating/ExtendedRatingResolver';
import { getNodes } from './imageHandling/UploadNodes';
import { LocationResolver } from './sights/LocationResolver';
import { CRUDProductResolver } from './product/CRUDProductResolver';
import { PaymentResolver } from './payment/PaymentResolver';

(async () => { 
    const app = express(); 
    app.use(cookieParser());

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))

    app.use(express.static('public'));
    usermanager(app)

    app.post('/upload/property/image', );

    imgUpload(app, getNodes())

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                UserResolver, 
                BookingResolver, 
                PropertyResolver, 
                CRUDPropertyResolver,
                CRUDSightsResolver, 
                CRUDRatingResolver,
                ExtendedRatingResolver,
                LocationResolver,
                CRUDProductResolver,
                PaymentResolver
            ]
        }),
        context: ({req, res}) => ({req, res})
    });

    await createConnection();

    apolloServer.applyMiddleware({app, cors: false});

    app.listen(4000, () => {
        console.log('Server is listening on Port 4000')
    })
})()
