import {Entity, Column, OneToMany} from "typeorm";
import {ObjectType, Field, InputType} from 'type-graphql'
import { Booking } from "./Booking";
import { __Type } from "graphql";
import { EntityBase } from "./EntityBase";




@ObjectType("Property")
@InputType("PropertyInput")
@Entity("property")
export class Property extends EntityBase{


    @Field()
    @Column("text", {default: ""})
    title: string;

    @Field()
    @Column("text", {default: ""})
    subtext: string;

    @Field()
    @Column("text", {default: ""})
    location: string;

    @Field()
    @Column("float")
    long: number;

    @Field()
    @Column("float")
    lat: number; 
    
    @Field()
    @Column("float", {default: 0})
    beds_adult: number; 
    
    @Field()
    @Column("float", {default: 0})
    beds_kids: number;
    
    @Field()
    @Column("float", {default: 0})
    beds_tent: number;  

    @Field(() => [String])
    @Column("text", { array: true, default: null})
    images: string[];

    @OneToMany(_type => Booking, booking  => booking.property )
    booking: Booking[]

}
