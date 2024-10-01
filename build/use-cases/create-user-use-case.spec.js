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

// src/use-cases/create-user-use-case.spec.ts
var import_vitest = require("vitest");

// src/use-cases/create-user-use-case.ts
var CreateUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  handler(user) {
    return __async(this, null, function* () {
      return this.userRepository.create(user);
    });
  }
};

// src/use-cases/create-user-use-case.spec.ts
(0, import_vitest.describe)("CreateUserUseCase", () => {
  (0, import_vitest.it)("should call userRepository.create with the correct user", () => __async(exports, null, function* () {
    const userRepository = {
      create: import_vitest.vi.fn().mockResolvedValueOnce({
        id_user: "1",
        username: "john_doe",
        password: "hashed_password"
      })
    };
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const user = {
      username: "john_doe",
      password: "hashed_password"
    };
    const result = yield createUserUseCase.handler(user);
    (0, import_vitest.expect)(userRepository.create).toHaveBeenCalledWith(user);
    (0, import_vitest.expect)(result).toEqual({
      id_user: "1",
      username: "john_doe",
      password: "hashed_password"
    });
  }));
});
