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

// src/controllers/administration/person/get-person.ts
var get_person_exports = {};
__export(get_person_exports, {
  getPerson: () => getPerson
});
module.exports = __toCommonJS(get_person_exports);

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var env;
console.log(process.env.ENVIRONMENT);
if (process.env.ENVIRONMENT === "development") {
  const envSchema = import_zod.z.object({
    PORT: import_zod.z.coerce.number().default(3e3),
    DATABASE_USER: import_zod.z.string(),
    DATABASE_NAME: import_zod.z.string(),
    DATABASE_PASSWORD: import_zod.z.string(),
    DATABASE_HOST_DEV: import_zod.z.string(),
    DATABASE_PORT_DEV: import_zod.z.coerce.number()
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
} else if (process.env.ENVIRONMENT === "production") {
  const envSchema = import_zod.z.object({
    DATABASE_USER: import_zod.z.string(),
    DATABASE_NAME: import_zod.z.string(),
    DATABASE_PASSWORD: import_zod.z.string(),
    PORT: import_zod.z.coerce.number().default(3e3),
    DATABASE_HOST_PROD: import_zod.z.string(),
    DATABASE_PORT_PROD: import_zod.z.coerce.number()
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
var CONFIG = {};
if (process.env.ENVIRONMENT === "development") {
  CONFIG = {
    user: env.DATABASE_USER,
    host: env.DATABASE_HOST_DEV,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
    port: env.DATABASE_PORT_DEV
  };
} else if (process.env.ENVIRONMENT === "production") {
  CONFIG = {
    user: env.DATABASE_USER,
    host: env.DATABASE_HOST_PROD,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
    port: env.DATABASE_PORT_PROD
  };
}
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
  getPersonById(id) {
    return __async(this, null, function* () {
      var _a;
      const query = `SELECT * FROM person WHERE id = $1`;
      const result = yield (_a = database.clientInstance) == null ? void 0 : _a.query(query, [id]);
      return result == null ? void 0 : result.rows[0];
    });
  }
};

// src/use-cases/get-person-use-case.ts
var GetPersonUseCase = class {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }
  handler(id) {
    return __async(this, null, function* () {
      return this.personRepository.getPersonById(id);
    });
  }
};

// src/use-cases/factory/make-get-person-use-case.ts
function makeGetPersonUseCase() {
  const personRepository = new PersonRepository();
  const getPersonUseCase = new GetPersonUseCase(personRepository);
  return getPersonUseCase;
}

// src/controllers/administration/person/get-person.ts
function getPerson(req, res) {
  return __async(this, null, function* () {
    const getPersonUseCase = makeGetPersonUseCase();
    const person = yield getPersonUseCase.handler();
    return res.status(200).send(person);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPerson
});