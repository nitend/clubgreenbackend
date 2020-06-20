export const IMAGE_BASE_DIR = "public/images/"

export const IMAGE_UPLOAD_BASE_URL = "properties/"


export const dbConfig = {
    endpoint: process.env.COSMOS_DB_URL ? process.env.COSMOS_DB_URL: "no endpoint found",
    key: process.env.COSMOS_DB_SECRET_KEY ? process.env.COSMOS_DB_SECRET_KEY : "no key found",
    databaseId: "clubgreenDb",
    partitionKey: {kind: "Hash", paths: ["/products"]}
   
}

