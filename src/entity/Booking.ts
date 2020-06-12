import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {ObjectType, Field} from 'type-graphql'
import { Property } from "./Property";

@ObjectType("Booking")
@Entity("buchung")
export class Booking extends BaseEntity{

    @Field(() => String)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column("text", {default: ""})
    user: string;

    @Field()
    @Column("bigint")
    date: number;

    @Field()
    @Column("bigint", {default: 0})
    from: number;

    @Field()
    @Column("bigint", {default: 0})
    to: number;

    @Field()
    @Column("boolean", {default: false})
    deleted: boolean;

    @Field()
    @Column("int")
    propertyId: string;

    @Field()
    @ManyToOne(_type => Property, property  => property.booking )
    property: Property
}
