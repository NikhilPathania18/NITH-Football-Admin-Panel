const mongoose = require("mongoose");
const staticDataSchema = new mongoose.Schema(
  {
    en: {
      hero: {
        title1: { type: String },
        title2: { type: String },
        title3: { type: String },
        title4: { type: String },
      },
      ourServices: { title: String, description: String },
      gallery: { title: String, description: String },
      blog: { title: String, description: String },
      contactUs: { title: String, description: String },
      copyRight: { type: String },
    },
    are: {
      hero: {
        title1: { type: String },
        title2: { type: String },
        title3: { type: String },
        title4: { type: String },
      },
      ourServices: { title: String, description: String },
      gallery: { title: String, description: String },
      blog: { title: String, description: String },
      contactUs: { title: String, description: String },
      copyRight: { type: String },
    },
    socialLinks: {
      fb: { type: String, default: "https://www.facebook.com/108948947493221" },
      insta: { type: String, default: "https://www.instagram.com/ocealics" },
      linkedin: {
        type: String,
        default: "https://www.linkedin.com/company/53181078",
      },
      pinterest: {
        type: String,
        default: "https://www.pinterest.com/ocealics",
      },
      tiktok: { type: String, default: "https://www.tiktok.com/@ocealics" },
      twitter: { type: String, default: "https://www.twitter.com/ocealics" },
      youtube: {
        type: String,
        default: "https://www.youtube.com/channel/UCSjt4VYXBnjLp0u4XVfoCCw",
      },
    },
    contactInfo: { email: String, phone: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("StaticData", staticDataSchema);
