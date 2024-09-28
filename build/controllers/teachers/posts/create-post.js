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

// src/controllers/teachers/posts/create-post.ts
var create_post_exports = {};
__export(create_post_exports, {
  createPost: () => createPost
});
module.exports = __toCommonJS(create_post_exports);

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

// src/repositories/posts-repository.ts
var PostsRepository = class {
  findAllPosts(page, limit) {
    return __async(this, null, function* () {
      var _a;
      const offset = (page - 1) * limit;
      const queryResult = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `SELECT * FROM posts LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      return queryResult == null ? void 0 : queryResult.rows;
    });
  }
  findPostById(id_post) {
    return __async(this, null, function* () {
      var _a;
      const queryResult = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `SELECT * FROM posts WHERE id_post = $1`,
        [id_post]
      );
      return queryResult == null ? void 0 : queryResult.rows[0];
    });
  }
  createPost(_0) {
    return __async(this, arguments, function* ({
      id_teacher,
      id_subject,
      post_text,
      post_title,
      post_date
    }) {
      var _a;
      const query = `INSERT INTO posts (id_teacher, id_subject, post_text, post_title, post_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const queryResult = yield (_a = database.clientInstance) == null ? void 0 : _a.query(query, [
        id_teacher,
        id_subject,
        post_text,
        post_title,
        post_date
      ]);
      return queryResult == null ? void 0 : queryResult.rows[0];
    });
  }
  updatePost(_0) {
    return __async(this, arguments, function* ({
      id_post,
      id_teacher,
      id_subject,
      post_text,
      post_title,
      post_date
    }) {
      var _a;
      const query = `UPDATE posts SET id_teacher = $1, id_subject = $2, post_text = $3, post_title = $4, post_date = $5 WHERE id_post = $6 RETURNING *`;
      const queryResult = yield (_a = database.clientInstance) == null ? void 0 : _a.query(query, [
        id_teacher,
        id_subject,
        post_text,
        post_title,
        post_date,
        id_post
      ]);
      return queryResult == null ? void 0 : queryResult.rows[0];
    });
  }
  deletePost(id_post) {
    return __async(this, null, function* () {
      var _a;
      yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `DELETE FROM posts WHERE id_post = $1`,
        [id_post]
      );
      return { Success: "Post deleted" };
    });
  }
  keyWordSearch(keyWord) {
    return __async(this, null, function* () {
      var _a;
      const queryResult = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `SELECT * FROM posts WHERE post_text ILIKE $1 OR post_title ILIKE $1`,
        [`%${keyWord}%`]
      );
      return queryResult == null ? void 0 : queryResult.rows;
    });
  }
};

// src/use-cases/create-post-use-case.ts
var CreatePostUseCase = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handler(post) {
    return __async(this, null, function* () {
      return this.postRepository.createPost(post);
    });
  }
};

// src/use-cases/factory/make-create-post-use-case.ts
function makeCreatePostUseCase() {
  const postRepository = new PostsRepository();
  const createPostUseCase = new CreatePostUseCase(postRepository);
  return createPostUseCase;
}

// src/controllers/teachers/posts/create-post.ts
var import_zod2 = require("zod");
function createPost(req, res) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod2.z.object({
      id_teacher: import_zod2.z.string(),
      id_subject: import_zod2.z.coerce.number(),
      post_text: import_zod2.z.string(),
      post_title: import_zod2.z.string(),
      post_date: import_zod2.z.coerce.date().default(() => /* @__PURE__ */ new Date())
    });
    const { id_teacher, id_subject, post_text, post_title, post_date } = registerBodySchema.parse(req.body);
    const createPostUseCase = makeCreatePostUseCase();
    const post = yield createPostUseCase.handler({
      id_teacher,
      id_subject,
      post_text,
      post_title,
      post_date
    });
    return res.status(201).send(post);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPost
});