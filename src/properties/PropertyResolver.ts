import {Resolver, Query, Mutation, Arg, Ctx, UseMiddleware} from 'type-graphql'
import { Property } from '../entity/Property';
import {MyContext} from '../usermanagement/MyContext'
import { isAuth } from '../usermanagement/isAuthMiddleware';
import { Booking } from '../entity/Booking';
import { getRepository, MoreThan} from 'typeorm';


@Resolver()
export class PropertyResolver {

    @Query(() => [Property], {nullable: true})
    @UseMiddleware(isAuth)
    async allProperties() {        
        const properties = await Property.find();
        return properties;
    }

    @Query(() => [Property], {nullable: true})
    async teaserProperties() {        
        const properties = await Property.find();
        return properties;
    }

    @Mutation(() => Boolean)
    // @UseMiddleware(isAuth)
    async saveProperty(@Ctx() { payload }: MyContext,
        @Arg("property") prop: Property){

        console.log(payload?.userId)
        
        if(prop){
            Property.save(
                prop
            )
        }       
        return true;
    }

    @Query(() => [Booking], {nullable: true})
    async activeBookingsForProperty(@Arg("propertyId") propertyId: string){

        const now = 1585045974594//Date.now();
        
        const buchungRep = getRepository(Booking);
        const result = await buchungRep.find({      
            where: [
                {propertyId: propertyId, to: MoreThan(now)}
            ],         
        })
        // const bookingsForProperty = await createQueryBuilder("buchung")
           // .where("prope = :id", { id: propertyId }) // andWhere("to = :date", {date : MoreThan(now)}).          
           // .getMany();
        
        return result

    }

    
    @Mutation(() => Boolean)
    // @UseMiddleware(isAuth)
    async createProperty(@Ctx() { payload }: MyContext,
        @Arg("title") title: string,
        @Arg("location") location: string,
        @Arg("subtext") subtext: string,
        @Arg("lat")  lat: number,
        @Arg("long") long: number,
        @Arg("beds_adult")  beds_adult: number,
        @Arg("beds_kids") beds_kids: number,
        @Arg("beds_tent") beds_tent: number,
        @Arg("images", _type => [String]) images: string[]){

        console.log(payload?.userId)
        
        if(title){
            Property.insert(
                {
                    title: title,
                    location: location,
                    subtext: subtext,
                    lat: lat,
                    long: long,
                    beds_adult: beds_adult,
                    beds_kids: beds_kids,
                    beds_tent: beds_tent,
                    images: images                   
                }
            )
        }
        
        return true;
    }
    
}

