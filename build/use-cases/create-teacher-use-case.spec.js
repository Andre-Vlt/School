"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/use-cases/create-teacher-use-case.spec.ts
var import_vitest = require("vitest");

// src/use-cases/create-teacher-use-case.ts
var CreateTeacherUseCase = class {
  constructor(teacherRepository) {
    this.teacherRepository = teacherRepository;
  }
  handler(teacher) {
    return __async(this, null, function* () {
      return this.teacherRepository.create(teacher);
    });
  }
};

// src/use-cases/create-teacher-use-case.spec.ts
(0, import_vitest.describe)("CreateTeacherUseCase", () => {
  (0, import_vitest.it)("should call teacherRepository.create with the correct teacher", () => __async(exports, null, function* () {
    const teacherRepository = {
      create: import_vitest.vi.fn().mockResolvedValueOnce({
        id_teacher: "1",
        id_person: "person-school-fiap",
        id_subject: 101
      })
    };
    const createTeacherUseCase = new CreateTeacherUseCase(teacherRepository);
    const teacher = {
      id_person: "person-school-fiap",
      id_subject: 101
    };
    const result = yield createTeacherUseCase.handler(teacher);
    (0, import_vitest.expect)(teacherRepository.create).toHaveBeenCalledWith(teacher);
    (0, import_vitest.expect)(result).toEqual({
      id_teacher: "1",
      id_person: "person-school-fiap",
      id_subject: 101
    });
  }));
});
