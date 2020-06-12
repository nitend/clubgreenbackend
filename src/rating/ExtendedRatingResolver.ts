import {Resolver, Query, Arg, ObjectType, Field} from 'type-graphql'
import { Rating } from '../entity/Rating';

@ObjectType()
class RatingValues {
    @Field()
    targettype: string

    @Field()
    targetId: number

    @Field()
    ratings: number
    
    @Field()
    ratingValue: number
}


@Resolver()
export class ExtendedRatingResolver {

    @Query(() => RatingValues, {nullable: true})
    // @UseMiddleware(isAuth)
    async getRatingValuesByTarget(
        @Arg("targettype") targettype: string,
        @Arg("targetId") targetId: string
    ) {        
        const rating = await Rating.query(
            'SELECT COUNT(*) AS RatingCount AVG(*) as RatingAVG FROM Rating WHERE targettype='+targettype+' AND targetId='+targetId);
        
        console.log(rating)

        const testRV: RatingValues = {
            targetId: 1,
            targettype: "property",
            ratingValue: 2.3,
            ratings: 2
        }
        return testRV;
    }
    

}

