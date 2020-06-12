import jimp from 'jimp'

interface imageSize {
    width: number
    height: number
    filenameAppendix: string
}


export const resizeImage = (filepath: string, size: imageSize) => {
    jimp.read(filepath, (err, profile) => {
        if(err)  throw err
       
        const newfilepath = filepath.replace(".", size.filenameAppendix + ".")
        profile
            .cover(size.width, size.height, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
            .write(newfilepath)
    })
}

export const smallSize = {
    width: 100,
    height: 100,
    filenameAppendix: "-sm"
}

export const mediumSize = {
    width: 300,
    height: 300,
    filenameAppendix: "-md"
}

export const largeSize = {
    width: 700,
    height: 400,
    filenameAppendix: "-lg"
}