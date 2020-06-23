import {Resolver, Query, Arg, UseMiddleware, Mutation} from 'type-graphql'
import { isAuth } from '../usermanagement/isAuthMiddleware';
import { Ratings } from '../database';
import { Rating } from '../entity/Rating';
import { RatingValues } from './ObjectTypes';



@Resolver()
export class RatingResolver{

    db = Ratings

    @Query(() => Rating, {nullable: true})
    async getRating(
        @Arg("id") id: string
    ) {        
        return await this.db.findById(id);
    }

    @Query(() => Rating)
    @UseMiddleware(isAuth)
    async getNewRating(){ 
        return await this.db.insert(new Rating())
    }

    @Query(() => [Rating], {nullable: true})
    async getAllRatings() {
        return await this.db.getAll();
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateRating(
        @Arg("rating") rating: Rating){ 
        return await this.db.replace(rating)
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteRating(
        @Arg("id") id: string){    
        return await this.db.delete(id);      
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async insertRating(
        @Arg("rating") rating: Rating){ 
        return await this.db.insert(rating)
    }

    @Query(() => RatingValues, {nullable: true})
    // @UseMiddleware(isAuth)
    async getRatingValuesByTarget(
        @Arg("targetId") targetId: string
    ) { 
        console.log(targetId)
    }
}

