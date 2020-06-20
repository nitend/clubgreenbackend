import {Entity, Column} from "typeorm";
import {ObjectType, Field} from 'type-graphql'
import { EntityBase } from "./EntityBase";

@ObjectType()
@Entity("email")
export class Email extends EntityBase{

    @Field()
    @Column("text")
    email: string;

    @Field()
    @Column("boolean", {default: false})
    verified: boolean;

    @Field()
    @Column("text", {default: ""})
    verification_token: string;

    @Field()
    @Column("bigint", {nullable: true})
    verification_date: number;

}
