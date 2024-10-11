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

// src/use-cases/factory/make-create-person-use-case.ts
var make_create_person_use_case_exports = {};
__export(make_create_person_use_case_exports, {
  makeCreatePersonUseCase: () => makeCreatePersonUseCase
});
module.exports = __toCommonJS(make_create_person_use_case_exports);

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var env;
if (process.env.ENVIRONMENT === "development") {
  const envSchema = import_zod.z.object({
    PORT: import_zod.z.coerce.number().default(3e3),
    DATABASE_USER: import_zod.z.string(),
    DATABASE_NAME: import_zod.z.string(),
    DATABASE_PASSWORD: import_zod.z.string(),
    DATABASE_HOST: import_zod.z.string(),
    DATABASE_PORT: import_zod.z.coerce.number()
  });
  const _env = envSchema.safeParse(process.env);
  if (!_env.success) {
    console.error(
      `There's something wrong with the environment variables`,
      _env.error.format()
    );
    throw new Error(`There's something wrong with the environment variables`);
  }
  env = _env.data;
} else if (process.env.NODE_ENV === "production") {
  const envSchema = import_zod.z.object({
    PORT: import_zod.z.coerce.number().default(3e3),
    DATABASE_URL: import_zod.z.string()
  });
  const _env = envSchema.safeParse(process.env);
  if (!_env.success) {
    console.error(
      `There's something wrong with the environment variables`,
      _env.error.format()
    );
    throw new Error(`There's something wrong with the environment variables`);
  }
  env = _env.data;
}

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeCreatePersonUseCase
});
