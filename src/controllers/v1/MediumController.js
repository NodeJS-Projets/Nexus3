const Logger= require("../../utils/logger")
const axios= require("axios")
const logger= new Logger()


const mediumUserToken = process.env.medium_user_token || null
const MediumApis= {
    userData: "https://api.medium.com/v1/me",
    userPublications: "//api.medium.com/v1/users/?/publications",
    userArticles: "https://v1.nocodeapi.com/ashik/medium/hNYNkksHwqKobDYs"
}

const Tag= "MediumController"
exports.MediumController = {
    getUserData: async (req, res) => {
        if (mediumUserToken){
            logger.emit("logInfo", Tag, "Medium user Access Key found in the request")
            try{
                logger.emit("logInfo", Tag, "getting Medium user data")
                const data= await getUserData(MediumApis.userData, mediumUserToken)
                logger.emit("logInfo", Tag, `user MediumData: ${JSON.stringify(data.data)}`)
                res.json(data.data)
            } catch (error){
                logger.emit("logError", Tag, `Error fetching the user Medium data: ${error.message}`)
                res.status(500).json({ error: error.message });
            }
        }
        else{
            logger.emit("logError", Tag, "Invalid request: please add Medium user access key in env File, refer ReadMe file.")
            res.status(500).json({ error: "Invalid request: please add Medium user access key in env File, refer ReadMe file."});

        }
    },

    getUserPublication: async (req, res) => {
        let userId= req.body.userId;
        if (mediumUserToken && userId){
            logger.emit("logInfo", Tag, "Medium user Access Key found in the request")
            try{
                logger.emit("logInfo", Tag, "getting Medium user publications")
                const data= await getUserPublication(MediumApis.userPublications, mediumUserToken, userId)
                logger.emit("logInfo", Tag, `user Publisher Data: ${Object.keys(data).length}`)
                res.json(data)
            } catch (error){
                logger.emit("logError", Tag, `Error fetching the user publications in Medium: ${error.message}`)
                res.status(500).json({ error: error.message });
            }
        }
        else{
            logger.emit("logError", Tag, "Invalid request: please provide Medium user access key and userId")
            res.status(500).json({ error: "Invalid request: please provide Medium user access key and userId"})
        }
    },

    getUserArticles: async (req, res) => {
        try{
            logger.emit("logInfo", Tag, "getting Medium user articles")
            const data= await getUserArticles(MediumApis.userArticles)
            logger.emit("logInfo", Tag, `user MediumData: ${Object.keys(data).length}`)
            res.json(data)
        } catch (error){
            logger.emit("logError", Tag, `Error fetching the user Articles on medium: ${error.message}`)
            res.status(500).json({ error: error.message });
        }
    }
}


// Here we are getting the users MediumData
async function getUserData(requestUrl, token){
    try{
        const response= await axios.get(requestUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    }catch (error) {
        throw new Error(`Error fetching the user Medium data: ${error.message}`)
    }

}

// Here we are getting the users Publications
async function getUserPublication(requestUrl, token, userId){
    try{
        requestUrl= requestUrl.replace('?', userId)
        const response= await axios.get(requestUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    }catch (error) {
        throw new Error(`Error fetching the user publications in Medium: ${error.message}`)
    }

}

// Here we are getting the users Publications
async function getUserArticles(requestUrl){
    try{
        const response= await axios.get(requestUrl)
        return response.data
    }catch (error) {
        throw new Error(`Error fetching the user Articles on medium: ${error.message}`)
    }

}
// const MediumController = {
//     getUserData: (req, res) => {
//         res.send("Medium Controller: Ashik Rai")
//     }
// };

// export {MediumController};