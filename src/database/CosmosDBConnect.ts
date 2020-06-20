import { CosmosClient, Container} from '@azure/cosmos';
import {genUuid} from './UUIDGen'
import {dbConfig} from '../config';
 
const client = new CosmosClient({ 
        endpoint: dbConfig.endpoint, 
        key: dbConfig.key });
 
async function create() {
  const {database} = await client.databases.createIfNotExists({ id: dbConfig.databaseId});
  return database;
}

export interface BaseDataItem {
    id: string
    deleted: boolean
    creationDate: string
}

export class DataItem<T extends BaseDataItem>{

  constructor(containerId: string){
    this.containerId = containerId
  }

  containerId = "";

  async getContainer (): Promise<Container> {
    const db = await create()
    const {container} = await db.containers.createIfNotExists({ id: this.containerId}); 
    if(container){
      return container;
    }
    else {
      throw new Error("")
    }
  }

  async insert (item: T): Promise<T> {
    const container = await this.getContainer();
    item.id = genUuid()
    item.creationDate = new Date(Date.now()).toDateString()
    return new Promise<T>((resolve, reject) => {
      container.items.create(item).then(result => {
        resolve(result.resource)
      }).catch((error) => {
        reject(error)
      }) 
    })
  }
      
  querySpec = {
  query: "SELECT * from c"
  };

  async getAll (): Promise<T[]>{
    const container = await this.getContainer();
    return new Promise<T[]>((resolve, reject) => {
      container.items.query(this.querySpec).fetchAll().then((data) => {
        console.log(data.resources)
        resolve(data.resources)
      }).catch(error => {
        reject(error)
      })
    })
  }

  async delete (id: string): Promise<Boolean>{
    const item = await this.findById(id);
    item.deleted = true; 
    return this.replace(item)
  }

  async replace (item: T): Promise<Boolean>{
    const container = await this.getContainer();
    return new Promise<Boolean>((resolve, reject) => {
      container.item(item.id).replace(item).then((data) => {
        if(data.resource){
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(error => reject(error))
    })  
  }

  async findById(id: string): Promise<T>{
    const container = await this.getContainer();
    return new Promise<T>((resolve, reject) =>{
      container.item(id).read()
        .then(data => resolve(data.resource))
        .catch(error => reject(error))
    })
  }

  async findByPropValue(property: string, value: string): Promise<T[]>{
    const query = { query: "SELECT * from c WHERE "+property+" = '"+value+"'" };
    const container = await this.getContainer();
    return new Promise<T[]>((resolve, reject) =>{
      container.items.query(query).fetchAll()
        .then(data => resolve(data.resources))
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}
/*

console.log(container.id);

const cities = [
    { id: "1", name: "Olympia", state: "WA", isCapitol: true },
    { id: "2", name: "Redmond", state: "WA", isCapitol: false },
    { id: "3", name: "Chicago", state: "IL", isCapitol: false }
  ];
  for (const city of cities) {
    container.items.create(city);
  }


  await container.item("1").read();

// Delete the first item returned by the query above
await container.item("1").delete();

const { resources } = await container.items
  .query("SELECT * from c WHERE c.isCapitol = true")
  .fetchAll();
for (const city of resources) {
  console.log(`${city.name}, ${city.state} is a capitol `);
}

const { resources } = await container.items
  .query({
    query: "SELECT * from c WHERE c.isCapitol = @isCapitol",
    parameters: [{ name: "@isCapitol", value: true }]
  })
  .fetchAll();
for (const city of resources) {
  console.log(`${city.name}, ${city.state} is a capitol `);
}
*/
