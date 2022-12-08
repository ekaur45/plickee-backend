class AddSegmentRequest{
    constructor(obj){
        this.video_id =obj.videoId;
        this.title = obj.title;
        this.link = obj.link;
        this.description = obj.description;
        this.to = obj.to;
        this.from = obj.from;
        this.userId = null;
        this.previewImage = obj.linkPreviewImage;
        this.validate = function(){
            return this.video_id&&this.link&&this.description&&this.to&&this.from&&this.userId&&this.previewImage;
        }
    }
    get params(){
        return [
            this.video_id,
            this.title,
            this.link,
            this.description,
            this.from,
            this.to,
            this.userId,
            this.previewImage
        ]
    }
}
module.exports = {AddSegmentRequest};