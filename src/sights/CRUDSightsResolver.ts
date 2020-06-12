import {Resolver, Query, Mutation, Arg, UseMiddleware} from 'type-graphql'
import { Sight } from '../entity/Sight';
import { isAuth } from '../usermanagement/isAuthMiddleware';


@Resolver()
export class CRUDSightsResolver {

    @Query(() => [Sight], {nullable: true})
    // @UseMiddleware(isAuth)
    async getSights() {        
        const sights = await Sight.find({deleted: false});
        return sights;
    }

    @Query(() => Sight, {nullable: true})
    // @UseMiddleware(isAuth)
    async getSight(
        @Arg("id") id: string
    ) {        
        const sight = await Sight.findOne({id: id})
        return sight;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async saveSight(
        @Arg("sight") sight: Sight){    
        if(sight){
            const test = await Sight.save(sight)
            console.log(test)
            if(sight){
                return true
            }
        }       
        return false;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteSight(
        @Arg("id") id: string){    
            const sight = await Sight.findOne({id: id});
            if(sight){
                sight.deleted=true;
                Sight.save(sight);
                return true;
            }
        return false      
    }
}

