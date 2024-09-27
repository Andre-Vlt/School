"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/entities/models/posts.entity.ts
var posts_entity_exports = {};
__export(posts_entity_exports, {
  Post: () => Post
});
module.exports = __toCommonJS(posts_entity_exports);
var Post = class {
  constructor(id_teacher, id_subject, post_text, post_title, post_date) {
    this.id_teacher = id_teacher;
    this.id_subject = id_subject;
    this.post_text = post_text;
    this.post_title = post_title;
    this.post_date = post_date;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Post
});
