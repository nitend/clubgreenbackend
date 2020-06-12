import multer from 'multer'
import path from 'path'
import {Express} from 'express'
import fs from 'fs'
import { resizeImage, smallSize, mediumSize, largeSize } from './imageProcessing'
import { IMAGE_BASE_DIR } from '../config'


export interface imageUploadNode {
    uploadUrl: string
    imageUrl: string
    handleFileSaved: (id: string, fileName: string) => void
}



export const imgUpload = (app: Express, nodes: imageUploadNode[]) => {

    const storage = multer.diskStorage({
        destination: function (req, _file, cb) {
            var node = getnode(req.originalUrl)
            const imgDir = getFullFilepath(req.body.targetId, node);        
            makeDir(imgDir);
            cb(null, imgDir)
          },
        filename: function(req, file, cb){
            cb(null, req.body.targetId + '-' + Date.now() + path.extname(file.originalname) )
        }
    })

    function makeDir(dir: string){
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true});
        }
    }

    const getFullFilepath = (targetId: number, node: imageUploadNode | undefined) => { 
        return IMAGE_BASE_DIR + node?.imageUrl + "" + targetId +"/"}

    const upload = multer({ storage: storage}).single('imageFile');
    
    storage._handleFile

    function getnode(requestUrl: string) {
        return nodes.find((node) => {
            if(node.uploadUrl === requestUrl){
                return true;
            }
            return false;
        })
    }

    nodes.map((node) => {
        app.post(node.uploadUrl, (req, res) => {
            upload(req, res, (err) => {
                if(err){
                    res.type('application/json')
                    res.sendStatus(400)
                    res.end();
                } else {
                    const id = req.body.targetId;
                    const fullFilename = node.imageUrl + id + "/" + req.file.filename;
                    resizeImage(getFullFilepath(id, node) + req.file.filename, smallSize);
                    resizeImage(getFullFilepath(id, node) + req.file.filename, mediumSize);
                    resizeImage(getFullFilepath(id, node) + req.file.filename, largeSize);
                    node.handleFileSaved(id, fullFilename);
                    res.type('application/json')
                    res.sendStatus(200)
                    res.end();
                }
            })
        })

    })
    

}
