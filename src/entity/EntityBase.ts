import {PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, Entity} from "typeorm";
import {Field, ObjectType} from 'type-graphql'


@ObjectType("BaseEntity")
@Entity("base")
export class EntityBase extends BaseEntity{

    @Field(() => String)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @CreateDateColumn({type: 'timestamp'})
    creationDate: string; 

    @Column("boolean", {default: false})
    deleted: boolean;

}
