const { AudioCensorResponse, AddBlurCensorReq, BlurCensorResponse } = require("../../models/video/add-censor-ship");
const {execSync} = require("child_process");
const path = require("path");
const { existsSync, mkdirSync, rmSync } = require("fs");
/**
 * 
 * @param {Array<BlurCensorResponse>} list
 */
function makeBlurCommand(list){
    // let file = list[0].fileName;//.replace("/uploads/","");
    // let absolutePath = path.resolve("./public/");
    // let input = absolutePath+"/"+file;
    // let output = absolutePath+"/censored"+file;

    let file = list[0].video.fileName;
    let absolutePath = path.resolve("./public/uploads/");
    let input = absolutePath+"/"+list[0].video.fileName;
    const filePath = "/public/uploads/censored/video/"+file;
    if(!existsSync(absolutePath+"/censored")) mkdirSync(absolutePath+"/censored");
    let audioCensorFolder = absolutePath+"/censored/video/";
    if(!existsSync(audioCensorFolder)) mkdirSync(audioCensorFolder);
    let output = absolutePath+"/censored/video/"+file;


    let array_of_blur = list;
    let command = `ffmpeg -i ${input} -filter_complex -vcodec libx264 -preset ultrafast"`;
    array_of_blur.forEach((obj,ndx)=>{
        command+=`[0:v]crop=w=${obj.wdith}:h=${obj.height}:x=${obj.x}:y=${obj.y},boxblur=20:enable='between(t,${obj.from},${obj.to})'[c${ndx}]; `
    });
    array_of_blur.forEach((obj,ndx)=>{
        if(ndx==0){
            command+=`[0:v][c${ndx}]overlay=x=${obj.x}:y=${obj.y}y:enable='between(t,${obj.from},${obj.to})'[v${ndx}]; `;
        }else if (ndx+1 == array_of_blur.length){
            command+=`[v${ndx-1}][c${ndx}]overlay=x=${obj.x}:y=${obj.y}:enable='between(t,${obj.from},${obj.to})'[v] `;
        }else{
            command+=`[v${ndx-1}][c${ndx}]overlay=x=${obj.x}:y=${obj.y}:enable='between(t,${obj.from},${obj.to})'[v${ndx}]; `;
        }
    })
    command+=`" -map "[v]" -movflags +faststart ${output}`;
    //return command;
    return {
        command,
        filePath,
        file
    }
    //console.log({command});
}
/**
 * 
 * @param {Array<AudioCensorResponse>} list 
 */
function makeCommand(list){
    let file = list[0].video.fileName;
    let absolutePath = path.resolve("./public/uploads/");
    let input = absolutePath+"/"+list[0].video.fileName;
    const filePath = "/public/uploads/censored/audio/"+file;
    if(!existsSync(absolutePath+"/censored")) mkdirSync(absolutePath+"/censored");
    let audioCensorFolder = absolutePath+"/censored/audio/";
    if(!existsSync(audioCensorFolder)) mkdirSync(audioCensorFolder);
    let output = absolutePath+"/censored/audio/"+file;
    if(existsSync(output)) rmSync(output);

    let list_of_beeps = list;
    let commands_arr = [];
    for (let i = 0; i < list_of_beeps.length; i++) {
        const el = list_of_beeps[i];
        let beep_command = `volume=enable='between(t,${el.from},${el.to})':volume=0[main];sine=d=${el.to-el.from}:f=800,adelay=${el.from}s,pan=stereo|FL=c0|FR=c0[beep];[main][beep]amix=inputs=2`;
        commands_arr.push(beep_command);
    }
    let command =`ffmpeg -i "${input}" -vcodec libx264 -preset ultrafast -af "${commands_arr.join(',')}" ${output}`;
    console.log({command});
    return {
        command,
        filePath,
        file
    }
}

/**
 * 
 * @param {Array<AudioCensorResponse>} obj 
 */
async function AddAudioCensorShip(obj){
    return new Promise((resolve,reject)=>{
        const command = makeCommand(obj);
        const process = execSync(command.command);
        resolve({fileName:command.file,filePath:command.filePath,videoId:obj[0].videoId});
        console.log("done",JSON.stringify(obj));
        //return functionReturn(command,true);
    })
}


/**
 * 
 * @param {Array<BlurCensorResponse>} obj 
 */
async function AddBlurCensor(obj){
    return new Promise((resolve,reject)=>{
        const command = makeBlurCommand(obj);
        const process = execSync(command.command);
        resolve({fileName:command.file,filePath:command.filePath,videoId:obj[0].videoId});
        //console.log("done",JSON.stringify(obj));
        //return functionReturn(command,true);
    })
}
module.exports ={AddAudioCensorShip,AddBlurCensor};