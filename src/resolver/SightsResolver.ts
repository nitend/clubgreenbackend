import {Resolver, Query, Arg, UseMiddleware, Mutation} from 'type-graphql'
import { isAuth } from '../usermanagement/isAuthMiddleware';
import { Sights } from '../database';
import { Sight } from '../entity/Sight';


@Resolver()
export class SightResolver{

    db = Sights

    @Query(() => Sight, {nullable: true})
    async getSight(
        @Arg("id") id: string
    ) {        
        return await this.db.findById(id);
    }

    @Query(() => Sight)
    @UseMiddleware(isAuth)
    async getNewSight(){ 
        return await this.db.insert(new Sight())
    }

    @Query(() => [Sight], {nullable: true})
    async getAllSights() {
        return await this.db.getAll();
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateSight(
        @Arg("sight") sight: Sight){ 
        return await this.db.replace(sight)
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteSight(
        @Arg("id") id: string){    
        return await this.db.delete(id);      
    }
}

