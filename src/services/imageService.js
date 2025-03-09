import { imageModel } from '~/models/imageModel'
import { env } from '~/config/environment'
//(id, image) => create new image
const create = async (productId, image) =>
{
  try {
    image = image.path.replace('uploads\\', 'uploads/')
    const imageObj =
      {
        url: `${env.BASE_URL}/${image}`,
        title : image.filename,
        product_id: productId
      }

    const newImage = await imageModel.createNew(imageObj)

    return newImage

  } catch (error) {
    throw new Error(error)
  }
}
//(id, images) => create new images
const createMany = async (productId, files, name) =>
{
  try {
    const images = files.map(file => file.path)
    for ( let image of images) {
      image = image.replace('uploads\\', 'uploads/')
      const imageObj =
        {
          url: `${env.BASE_URL}/${image}`,
          title : name,
          product_id: productId
        }

      await imageModel.createNew(imageObj)
    }

  } catch (error) {
    throw new Error(error)
  }
}

//(id, image) => update image
const update = async (id, image) => {
  try {
    const updatedImage = imageModel.update(id, image)

    return updatedImage
  } catch (error) {
    throw new Error(error)
  }
}
//(id) => find image by id
const findOneById = async (id) =>
{
  try {
    const image = await imageModel.findOneById(id)

    return image
  } catch (error) {
    throw new Error(error)
  }
}
//() => find all image
const findAll = async () => {
  try {
    const images = await imageModel.findAll()
    return images
  } catch (error) {
    throw new Error(error)
  }
}

const deleteMany = async (urls) => {
  try {
    for (let id of urls) {
      await imageModel.remove(id)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const imageService = {
  create,
  createMany,
  findOneById,
  findAll,
  update,
  deleteMany
}