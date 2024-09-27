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

// src/entities/models/teacher.entity.ts
var teacher_entity_exports = {};
__export(teacher_entity_exports, {
  Teacher: () => Teacher
});
module.exports = __toCommonJS(teacher_entity_exports);
var Teacher = class {
  constructor(id_person, id_subject) {
    this.id_person = id_person;
    this.id_subject = id_subject;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Teacher
});
