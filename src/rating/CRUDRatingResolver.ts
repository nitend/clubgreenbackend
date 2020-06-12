import {Resolver, Query, Mutation, Arg, UseMiddleware} from 'type-graphql'
import { Rating } from '../entity/Rating';
import { isAuth } from '../usermanagement/isAuthMiddleware';


@Resolver()
export class CRUDRatingResolver {

    @Query(() => [Rating], {nullable: true})
    // @UseMiddleware(isAuth)
    async getAllRatings() {        
        const ratings = await Rating.find({deleted: false});
        return ratings;
    }

    @Query(() => Rating, {nullable: true})
    // @UseMiddleware(isAuth)
    async getRating(
        @Arg("id") id: string
    ) {        
        const rating = await Rating.findOne({id: id})
        return rating;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async saveRating(
        @Arg("rating") rating: Rating){    
        if(rating){
            const test = await Rating.save(rating)
            console.log(test)
            if(rating){
                return true
            }
        }       
        return false;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteRating(
        @Arg("id") id: string){    
            const rating = await Rating.findOne({id: id});
            if(rating){
                rating.deleted=true;
                Rating.save(rating);
                return true;
            }
        return false      
    }
}

