import { DataItem } from './CosmosDBConnect'
import { Product } from '../entity/Product'
import { User } from '../entity/User'
import { Property } from 'src/entity/Property';
import { Booking } from 'src/entity/Booking';
import { Sight } from 'src/entity/Sight';
import { Rating } from 'src/entity/Rating';


const Products = new DataItem<Product>("products")
const Users = new DataItem<User>("users");
const Properties = new DataItem<Property>("properties")
const Bookings = new DataItem<Booking>("bookings");
const Sights = new DataItem<Sight>("sights");
const Ratings = new DataItem<Rating>("ratings");


export {
    Products,
    Users,
    Properties,
    Bookings,
    Sights,
    Ratings
}