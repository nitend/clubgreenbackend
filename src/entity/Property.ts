import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import {ObjectType, Field, InputType} from 'type-graphql'
import { Booking } from "./Booking";
import { __Type } from "graphql";




@ObjectType("Property")
@InputType("PropertyInput")
@Entity("property")
export class Property extends BaseEntity{

    @Field(() => String)
    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @Column("boolean", {default: false})
    deleted: boolean;

    @Field(() => [String])
    @Column("text", { array: true, default: null})
    images: string[];

    @OneToMany(_type => Booking, booking  => booking.property )
    booking: Booking[]

}
