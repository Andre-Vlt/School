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

// src/use-cases/create-person-use-case.spec.ts
var import_vitest = require("vitest");

// src/use-cases/create-person-use-case.ts
var CreatePersonUseCase = class {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }
  handler(person) {
    return __async(this, null, function* () {
      return this.personRepository.create(person);
    });
  }
};

// src/use-cases/create-person-use-case.spec.ts
(0, import_vitest.describe)("CreatePersonUseCase", () => {
  (0, import_vitest.it)("should call personRepository.create with the correct person", () => __async(exports, null, function* () {
    const personRepository = {
      create: import_vitest.vi.fn().mockResolvedValueOnce({
        id_person: "1",
        id_user: "user-123",
        name: "John Doe",
        email: "johndoe@example.com",
        birth: /* @__PURE__ */ new Date("1990-01-01"),
        cpf: "123.456.789-10"
      })
    };
    const createPersonUseCase = new CreatePersonUseCase(personRepository);
    const person = {
      id_user: "user-123",
      name: "John Doe",
      email: "johndoe@example.com",
      birth: /* @__PURE__ */ new Date("1990-01-01"),
      cpf: "123.456.789-10"
    };
    const result = yield createPersonUseCase.handler(person);
    (0, import_vitest.expect)(personRepository.create).toHaveBeenCalledWith(person);
    (0, import_vitest.expect)(result).toEqual({
      id_person: "1",
      id_user: "user-123",
      name: "John Doe",
      email: "johndoe@example.com",
      birth: /* @__PURE__ */ new Date("1990-01-01"),
      cpf: "123.456.789-10"
    });
  }));
});
