import { imageUploadNode } from "./imageUploader";
import { Properties, Sights } from "../database";


export const getNodes = () => {

    const nodes: imageUploadNode[] = [

        {
            imageUrl: "properties/",
            uploadUrl: "/upload/property/image",
            handleFileSaved: updatePropertyImageData
        },
        {
            imageUrl: "sights/",
            uploadUrl: "/upload/sight/image",
            handleFileSaved: updateSightImageData
        }

    ]

    return nodes;

}

const propDb = Properties;
const sightDb = Sights;

const updatePropertyImageData = async (propId: string, imageUrl: string) => {
    const prop = await propDb.findByPropValue("id", propId)
    pushImageData(prop, imageUrl)
 
}

const updateSightImageData = async (sightId: string, imageUrl: string) => {
    const prop = await sightDb.findByPropValue("id", sightId)
    pushImageData(prop, imageUrl)
 
}

const pushImageData = (entity: any, imageUrl: string) => {
    if(entity){
        if(!entity.images){
            entity.images = [imageUrl];
        } else {
            entity.images.push(imageUrl);
        }    
        entity.save();
    } else {
        console.log("no images property in object")
    }
}