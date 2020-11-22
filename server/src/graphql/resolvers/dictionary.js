import Dictionary from "../../models/Dictionary";
import { processUpload } from "../../utils/uploadUtil";

export default {
    Query: {},
    Mutation: {
        createDictionary: async (_, { tags }) => {
            const newDictionary = new Dictionary({
                tags
            });

            return await newDictionary.save();
        },
        createCategory: async (_, { dictionaryId, name, details, files }) => {
            try {
                // console.log(await files[0], await files[1]);
                const dictionary = await Dictionary.findById(dictionaryId);
                const newCategory = { name, details, imgs: [] }

                for (const file of files) {
                    const newImage = await processUpload(file);
                    newCategory.imgs.push(newImage)
                }
               
                if (!dictionary.categories){
                    dictionary.categories = [newCategory];
                } else {
                    dictionary.categories.push(newCategory);
                }

                return await dictionary.save();
            } catch (error) {
                return error;
            }
        }
    }
}