import {ObjectType, Field, InputType} from 'type-graphql'
import { EntityBase } from "./EntityBase";

@ObjectType("Booking")
@InputType("bookingInput")
export class Booking extends EntityBase{

    @Field({nullable: true})
    user: string;

    @Field({nullable: true})
    dateOfArrival: string;

    @Field({nullable: true})
    dateOfDeparture: string;

    @Field({nullable: true})
    propertyId: string;
}
