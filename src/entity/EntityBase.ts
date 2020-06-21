
import {Field, ObjectType} from 'type-graphql'


@ObjectType("BaseEntity")
export class EntityBase{

    @Field(() => String)
    id: string;

    @Field()
    creationDate: string; 

    deleted: boolean;
}
