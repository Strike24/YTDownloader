// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs');
const ytdl = require('ytdl-core');
export default async function handler(req, res) {
    //get the url from the request body
    const url = req.query.link
    console.log(url)
    try {
        let info = await ytdl.getBasicInfo(url);
        res.setHeader('Content-disposition', `attachment; filename=${info.videoDetails.title}.mp3`);
        ytdl(url, { filter: "audioonly" })
            //download the file to the client side
            .pipe(res);

        console.log("passed")
    } catch (error) {
        res.status(500)
    }




}
