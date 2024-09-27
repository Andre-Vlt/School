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

// src/entities/models/student.entity.ts
var student_entity_exports = {};
__export(student_entity_exports, {
  Student: () => Student
});
module.exports = __toCommonJS(student_entity_exports);
var Student = class {
  constructor(id_person, grade) {
    this.id_person = id_person;
    this.grade = grade;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Student
});
