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

// src/use-cases/create-student-use-case.spec.ts
var import_vitest = require("vitest");

// src/use-cases/create-student-use-case.ts
var CreateStudentUseCase = class {
  constructor(studentRepository) {
    this.studentRepository = studentRepository;
  }
  handler(student) {
    return __async(this, null, function* () {
      return this.studentRepository.create(student);
    });
  }
};

// src/use-cases/create-student-use-case.spec.ts
(0, import_vitest.describe)("CreateStudentUseCase", () => {
  (0, import_vitest.it)("should call studentRepository.create with the correct student", () => __async(exports, null, function* () {
    const studentRepository = {
      create: import_vitest.vi.fn().mockResolvedValueOnce({
        id_student: "1",
        id_person: "person-school-fiap",
        grade: "A"
      })
    };
    const createStudentUseCase = new CreateStudentUseCase(studentRepository);
    const student = {
      id_person: "person-school-fiap",
      grade: "A"
    };
    const result = yield createStudentUseCase.handler(student);
    (0, import_vitest.expect)(studentRepository.create).toHaveBeenCalledWith(student);
    (0, import_vitest.expect)(result).toEqual({
      id_student: "1",
      id_person: "person-school-fiap",
      grade: "A"
    });
  }));
});
