class AddCensorsReq {
    constructor(obj) {
        this.video_id = obj.videoId;
        this.from = obj.from;
        this.to = obj.to;
        this.type = obj.type;
        this.isValid = function () {
            return this.video_id && this.from && this.to && this.type
        }
    }
}

class AudioCensorResponse {
    constructor(obj) {
        this.videoId = obj.video_id;
        this.from = obj.from;
        this.to = obj.to;
        this.type = obj.type;
        this.fileName = obj.fileName;
    }

}

class AddBlurCensorReq {
    constructor() {
        this.video_id = obj.videoId;
        this.from = obj.from;
        this.to = obj.to;
        this.x = obj.x;
        this.y = obj.y;
        this.width = obj.width;
        this.height = obj.height;
        this.type = obj.type;
        this.isValid = function () {
            return this.video_id && this.from && this.to && this.x && this.y && this.width && this.height && this.type
        }
    }
}


class BlurCensorResponse {
    constructor() {
        this.videoId = obj.videoId;
        this.from = obj.from;
        this.to = obj.to;
        this.x = obj.x;
        this.y = obj.y;
        this.width = obj.width;
        this.height = obj.height;
        this.type = obj.type;
        this.fileName = obj.fileName;
    }
}
module.exports = { AddCensorsReq, AudioCensorResponse, AddBlurCensorReq,BlurCensorResponse }