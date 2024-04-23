const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
// Add plugins
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema(
  {
    // Bắt buộc phải có ký tự: minLength, maxLength
    // required: true là bắt buộc phải nhập
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String, maxLength: 600 },
    thumbnail: { type: String, maxLength: 255 },
    videoId: { type: String, required: true },
    level: { type: String, maxLength: 100 },
    slug: { type: String, slug: "name", unique: true }, // tạo slug theo name được nhập vào và unique không được trùng
    // Nếu slug trùng thì sẽ xử dụng thư viện của mongoose-slug-generator tự tạo thêm shortID ngẫu nhiên vào cuối của slug
  },
  { _id: false, timestamps: true }
);

Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Course", Course);
