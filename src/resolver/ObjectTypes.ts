import { ObjectType, Field, InputType } from "type-graphql";
import { User } from "../entity/User";


@ObjectType()
export class BlockedDate {

    @Field()
    bookingId: string

    @Field()
    dateTimeStamp: number

    @Field()
    type: number // arrival = 1,  departure = 2 default = 0 

}

@ObjectType()
export class RatingValues {
    @Field()
    targettype: string

    @Field()
    targetId: number

    @Field()
    ratings: number
    
    @Field()
    ratingValue: number
}

@ObjectType()
export class LoginResponse{

    @Field()
    accessToken: string

    @Field(() => User)
    user: User;
}

@InputType()
export class UserAddress{

    @Field()
    streetName: string

    @Field()
    streetNumber: string;

    @Field()
    postalCode: string

    @Field()
    town: string;
}

@InputType()
export class UserName{

    @Field()
    gender: string;

    @Field()
    firstName: string

    @Field()
    surname: string;
}