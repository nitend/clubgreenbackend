import { DataItem } from './CosmosDBConnect'
import { Product } from '../entity/Product'
import { User } from '../entity/User'
import { Property } from '../entity/Property';
import { Booking } from '../entity/Booking';
import { Sight } from '../entity/Sight';
import { Rating } from '../entity/Rating';
import { Email } from '../entity/Email';


const Products = new DataItem<Product>("products")
const Users = new DataItem<User>("users");
const Properties = new DataItem<Property>("properties")
const Bookings = new DataItem<Booking>("bookings");
const Sights = new DataItem<Sight>("sights");
const Ratings = new DataItem<Rating>("ratings");
const Emails = new DataItem<Email>("emails")


export {
    Products,
    Users,
    Properties,
    Bookings,
    Sights,
    Ratings,
    Emails
}