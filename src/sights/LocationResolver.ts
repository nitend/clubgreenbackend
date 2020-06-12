import {Resolver, Query, ObjectType, Field } from 'type-graphql'
import { Sight } from '../entity/Sight';
import { Property } from '../entity/Property';

@ObjectType()
class Location {
    @Field()
    id: string

    @Field()
    title: string

    @Field()
    type: string

    @Field()
    lat: number

    @Field()
    long: number
    
    @Field(() => [String])
    images: string[]
}

@Resolver()
export class LocationResolver {

    @Query(() => [Location], {nullable: true})
    // @UseMiddleware(isAuth)
    async getAllLocations() { 
        
        const locations: Location[] = []
        const sights = await Sight.find({deleted: false});
        sights.map((s) => {
            locations.push({
                id: "sight" + s.id,
                title: s.title,
                type: s.type,
                lat: s.lat,
                long: s.long,
                images: s.images
            })
        })
        const properties = await Property.find({deleted: false});
        properties.map((p) => {
            locations.push({
                id: "property"+ p.id,
                title: p.title,
                type: "property",
                lat: p.lat,
                long: p.long,
                images: p.images
            })
        })
        return location;
    } 
}

