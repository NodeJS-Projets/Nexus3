const axios= require("axios")
const { Octokit, RequestError } = require("octokit");

const Logger= require("../../utils/logger")
const logger= new Logger()


const Tag= "GitHubController"
const GitHubUserToken = process.env.github_token || null
if (GitHubUserToken === null){
    logger.emit("logError", Tag, "Not able to read the GitHub User Auth Token from the env file, refer ReadMe file.")
    return
}
logger.emit("logInfo", Tag, "GitHub Token is "+GitHubUserToken)
    
const octokitObj= new Octokit({ auth: GitHubUserToken, userAgent: "nexus3/v1",});

async function authenticateUser(){
    try{
        const data = await octokitObj.rest.users.getAuthenticated();
        logger.emit("logInfo", Tag, "User Authenticated, %s"+JSON.stringify(data.data.login));
    } catch(error){
        logger.emit("logError", Tag, "GitHub Authentication Failed"+error)
        return
    }
}
authenticateUser();

exports.GithHubController = {
    getUserData: async (req, res) => {
        logger.emit("logInfo", Tag, "getting GitHub User Data")
        try{
            let response = await octokitObj.request("GET /user");
            logger.emit("logInfo", Tag, "Hello, %s"+response.data.login);
            response= response.data
            const GitHubData= {
                id: response.id,
                imageUrl: response.avatar_url,
                url: response.html_url,
                name: response.name,
                username: response.login,
                bio: response.bio,
            }
            res.send(GitHubData)
        } catch(error){
            logger.emit("logError", Tag, "Fetching GitHub user Data Failed: "+error)
            if (error === RequestError){
                res.status(error.status).json({ error: "Fetching GitHub user Data Failed: "+error})
            }
            res.status(500).json({ error: "Fetching GitHub user Data Failed"})
        }
    },
    getRepositryList: async(req, res) => {
        try{
            const repoList= await octokitObj.request('GET /user/repos', {
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            logger.emit("logInfo", Tag, "Repository list "+repoList.data.length)
            res.send(repoList.data)
        } catch(error){

        }
    },
    getOrganizationData: async(req, res) => {
        try{
            // const response= await octokitObj.request('GET /orgs/{org}/repos', {
            //     org: 'ORG',
            //     headers: {
            //     'X-GitHub-Api-Version': '2022-11-28'
            //     }
            // })
            // console.log(response);
            // res.send(response)
            await octokit.request('GET /repos/{owner}/{repo}', {
                owner: owner,
                repo: 'REPO',
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })
        }catch (error){
            logger.emit("logError", Tag, "Fetching GitHub Organization List Failed"+error)
            if (error === RequestError){
                res.status(error.status).json({ error: "Fetching GitHub Organization List Failed "+error})
            }
            res.status(500).json({ error: "Fetching GitHub Organization List Failed"})
        }
    }
}

