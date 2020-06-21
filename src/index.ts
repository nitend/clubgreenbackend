import 'dotenv/config'
import 'reflect-metadata'
import { UserResolver } from "./resolver/UserResolver";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import cookieParser from 'cookie-parser';
import {usermanager} from './usermanagement/usermanager'
import cors from 'cors'
import { BookingResolver } from './resolver/BookingResolver';
import { PropertyResolver } from './resolver/PropertyResolver';
import {imgUpload} from './imageHandling/imageUploader'
import { getNodes } from './imageHandling/UploadNodes';
import { ProductResolver } from './resolver/ProductResolver';
import { PaymentResolver } from './payment/PaymentResolver';
import { RatingResolver } from './resolver/RatingResolver';
import { SightResolver } from './resolver/SightsResolver';

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
                RatingResolver,
                SightResolver,
                ProductResolver,
                PaymentResolver
            ]
        }),
        context: ({req, res}) => ({req, res})
    });
    
    apolloServer.applyMiddleware({app, cors: false});

    app.listen(4000, () => {
        console.log('Server is listening on Port 4000')
    })
})()
