import {ObjectType, Field, InputType} from 'type-graphql'
import { Property } from "./Property";
import { EntityBase } from "./EntityBase";

@ObjectType("Booking")
@InputType("bookingInput")
export class Booking extends EntityBase{

    @Field({nullable: true})
    user: string;

    @Field({nullable: true})
    from: number;

    @Field({nullable: true})
    to: number;

    @Field({nullable: true})
    propertyId: string;

    @Field({nullable: true})
    property: Property
}
