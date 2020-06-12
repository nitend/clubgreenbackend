import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import {ObjectType, Field, Int} from 'type-graphql'

@ObjectType()
@Entity("email")
export class Email extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

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
