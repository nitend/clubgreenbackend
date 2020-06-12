import { ObjectType, Field } from "type-graphql";


@ObjectType()
export class BlockedDate {

    @Field()
    bookingId: string

    @Field()
    dateTimeStamp: number

    @Field()
    type: number // arrival = 1,  departure = 2 default = 0 

}