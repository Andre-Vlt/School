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

// src/controllers/administration/student/create-student.ts
var create_student_exports = {};
__export(create_student_exports, {
  createStudent: () => createStudent
});
module.exports = __toCommonJS(create_student_exports);

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
var import_zod2 = require("zod");
function createStudent(req, res) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod2.z.object({
      id_person: import_zod2.z.string(),
      grade: import_zod2.z.string().default("0")
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createStudent
});
