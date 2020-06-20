import {Entity, Column, ManyToOne} from "typeorm";
import {ObjectType, Field, InputType} from 'type-graphql'
import { Property } from "./Property";
import { EntityBase } from "./EntityBase";

@ObjectType("Booking")
@InputType("bookingInput")
@Entity("buchung")
export class Booking extends EntityBase{

    @Field()
    @Column("text", {default: ""})
    user: string;

    @Field()
    @Column("bigint", {default: 0})
    from: number;

    @Field()
    @Column("bigint", {default: 0})
    to: number;

    @Field()
    @Column("int")
    propertyId: string;

    @Field()
    @ManyToOne(_type => Property, property  => property.booking )
    property: Property
}
