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

// src/routes/administration-routes/adm-routes.ts
var adm_routes_exports = {};
__export(adm_routes_exports, {
  default: () => adm_routes_default
});
module.exports = __toCommonJS(adm_routes_exports);
var import_express = require("express");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  PORT: import_zod.z.coerce.number().default(3e3),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error(
    `There's something wrong with the environment variables`,
    _env.error.format()
  );
  throw new Error(`There's something wrong with the environment variables`);
}
var env = _env.data;

// src/database/database.ts
var import_pg = require("pg");
var CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT
};
var Database = class {
  constructor() {
    this.pool = new import_pg.Pool(CONFIG);
    this.connection();
  }
  connection() {
    return __async(this, null, function* () {
      try {
        this.client = yield this.pool.connect();
      } catch (error) {
        console.error(`Database connection error: ${error}`);
        throw new Error(`Database connection error: ${error}`);
      }
    });
  }
  get clientInstance() {
    return this.client;
  }
};
var database = new Database();

// src/repositories/person-repository.ts
var PersonRepository = class {
  create(_0) {
    return __async(this, arguments, function* ({
      id_user,
      name,
      email,
      birth,
      cpf
    }) {
      var _a;
      const query = `INSERT INTO person (id_user, name, email, birth, cpf) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const result = yield (_a = database.clientInstance) == null ? void 0 : _a.query(query, [
        id_user,
        name,
        email,
        birth,
        cpf
      ]);
      return result == null ? void 0 : result.rows[0];
    });
  }
};

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

// src/use-cases/factory/make-create-person-use-case.ts
function makeCreatePersonUseCase() {
  const personRepository = new PersonRepository();
  const createPersonUseCase = new CreatePersonUseCase(personRepository);
  return createPersonUseCase;
}

// src/controllers/administration/person/create-person.ts
var import_zod2 = require("zod");
function createPerson(req, res) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod2.z.object({
      id_user: import_zod2.z.string(),
      name: import_zod2.z.string(),
      email: import_zod2.z.string().email(),
      birth: import_zod2.z.coerce.date(),
      cpf: import_zod2.z.string().max(11)
    });
    const { id_user, name, email, birth, cpf } = registerBodySchema.parse(
      req.body
    );
    const createPersonUseCase = makeCreatePersonUseCase();
    const person = yield createPersonUseCase.handler({
      id_user,
      name,
      email,
      birth,
      cpf
    });
    return res.status(201).send(person);
  });
}

// src/repositories/student-repository.ts
var StudentRepository = class {
  create(_0) {
    return __async(this, arguments, function* ({ id_person, grade }) {
      var _a;
      const query = `INSERT INTO students (id_person, grade) VALUES ($1, $2) RETURNING *`;
      const queryResult = yield (_a = database.clientInstance) == null ? void 0 : _a.query(query, [
        id_person,
        grade
      ]);
      return queryResult == null ? void 0 : queryResult.rows[0];
    });
  }
};

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

// src/use-cases/factory/make-create-student-use-case.ts
function makeCreateStudentUseCase() {
  const studentRepository = new StudentRepository();
  const createStudentUseCase = new CreateStudentUseCase(studentRepository);
  return createStudentUseCase;
}

// src/controllers/administration/student/create-student.ts
var import_zod3 = require("zod");
function createStudent(req, res) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod3.z.object({
      id_person: import_zod3.z.string(),
      grade: import_zod3.z.string().default("0")
    });
    const { id_person, grade } = registerBodySchema.parse(req.body);
    const createStudentUseCase = makeCreateStudentUseCase();
    const student = yield createStudentUseCase.handler({
      id_person,
      grade
    });
    return res.status(201).send(student);
  });
}

// src/controllers/administration/teacher/create-teacher.ts
var import_zod4 = require("zod");

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

// src/repositories/teacher-repository.ts
var TeacherRepository = class {
  create(_0) {
    return __async(this, arguments, function* ({
      id_person,
      id_subject
    }) {
      var _a;
      const queryResult = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `INSERT INTO teachers (id_person, id_subject) VALUES ($1, $2) RETURNING *`,
        [id_person, id_subject]
      );
      return queryResult == null ? void 0 : queryResult.rows[0];
    });
  }
};

// src/use-cases/factory/make-create-teacher-use-case.ts
function makeCreateTeacherUseCase() {
  const teacherRepository = new TeacherRepository();
  const createTeacherUseCase = new CreateTeacherUseCase(teacherRepository);
  return createTeacherUseCase;
}

// src/controllers/administration/teacher/create-teacher.ts
function createTeacher(req, res) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod4.z.object({
      id_person: import_zod4.z.string(),
      id_subject: import_zod4.z.coerce.number()
    });
    const { id_person, id_subject } = registerBodySchema.parse(req.body);
    const createTeacherUseCase = makeCreateTeacherUseCase();
    const teacher = yield createTeacherUseCase.handler({
      id_person,
      id_subject
    });
    return res.status(201).send(teacher);
  });
}

// src/repositories/user-repository.ts
var UserRepository = class {
  create(_0) {
    return __async(this, arguments, function* ({ username, password }) {
      var _a;
      const queryResult = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
        [username, password]
      );
      return queryResult == null ? void 0 : queryResult.rows[0];
    });
  }
};

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

// src/use-cases/factory/make-create-user-use-case.ts
function makeCreateUserUseCase() {
  const userRepository = new UserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  return createUserUseCase;
}

// src/controllers/administration/user/create-user.ts
var import_zod5 = require("zod");
function createUser(req, res) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod5.z.object({
      username: import_zod5.z.string(),
      password: import_zod5.z.string()
    });
    const { username, password } = registerBodySchema.parse(req.body);
    const createUserUseCase = makeCreateUserUseCase();
    const user = yield createUserUseCase.handler({
      username,
      password
    });
    return res.status(201).send(user);
  });
}

// src/routes/administration-routes/adm-routes.ts
var admRouter = (0, import_express.Router)();
admRouter.post("/user", createUser);
admRouter.post("/person", createPerson);
admRouter.post("/teacher", createTeacher);
admRouter.post("/student", createStudent);
var adm_routes_default = admRouter;
