class UploadVideoModel {
    constructor(obj) {
        this.title = obj.title;
        this.description = obj.description;
        this.hashTags = obj.hashTags;
        this.files = obj.file;
        this.fileName = obj.fileName;
        this.category = obj.category;
        this.quality = obj.quality;
        this.releaseYear = obj.releaseYear;
        this.language = obj.language;
        this.duratio = obj.duratio;
    }
    /**
     * 
     * @param {*} files 
     */
    addFiles(files) {
        this.files = files;
    }
    /**
     * 
     */
    validateUploadRequest() {
        return (!this.title || !this.description || !this.files || this.files.length < 1);
    }
}
module.exports = { UploadVideoModel }