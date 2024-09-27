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

// src/routes/teacher-routes/teacher-routes.ts
var teacher_routes_exports = {};
__export(teacher_routes_exports, {
  default: () => teacher_routes_default
});
module.exports = __toCommonJS(teacher_routes_exports);
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

// src/use-cases/delete-post-use-case.ts
var DeletePostUseCase = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handler(id_post) {
    return __async(this, null, function* () {
      return yield this.postRepository.deletePost(id_post);
    });
  }
};

// src/use-cases/factory/make-delete-post-use-case.ts
function makeDeletePostUseCase() {
  const postRepository = new PostsRepository();
  const deletePostUseCase = new DeletePostUseCase(postRepository);
  return deletePostUseCase;
}

// src/controllers/teachers/posts/delete-post.ts
var import_zod3 = require("zod");
function deletePost(req, res) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod3.z.object({
      id_post: import_zod3.z.coerce.number()
    });
    const { id_post } = registerParamsSchema.parse(req.params);
    const deletePostUseCase = makeDeletePostUseCase();
    yield deletePostUseCase.handler(id_post);
    return res.status(201);
  });
}

// src/use-cases/find-all-posts-use-case.ts
var FindAllPostsUseCase = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handler(page, limit) {
    return __async(this, null, function* () {
      return this.postRepository.findAllPosts(page, limit);
    });
  }
};

// src/use-cases/factory/make-find-all-posts-use-case.ts
function makeFindAllPostsUseCase() {
  const postRepository = new PostsRepository();
  const findAllPostsUseCase = new FindAllPostsUseCase(postRepository);
  return findAllPostsUseCase;
}

// src/controllers/teachers/posts/find-all-posts.ts
var import_zod4 = require("zod");
function findAllPosts(req, res) {
  return __async(this, null, function* () {
    const registerQuerySchema = import_zod4.z.object({
      page: import_zod4.z.coerce.number().default(1),
      limit: import_zod4.z.coerce.number().default(5)
    });
    const { page, limit } = registerQuerySchema.parse(req.query);
    const findAllPostsUseCase = makeFindAllPostsUseCase();
    const posts = yield findAllPostsUseCase.handler(page, limit);
    return res.status(200).send(posts);
  });
}

// src/use-cases/update-post-use-case.ts
var UpdatePostUseCase = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handler(post) {
    return __async(this, null, function* () {
      return this.postRepository.updatePost(post);
    });
  }
};

// src/use-cases/factory/make-update-post-use-case.ts
function makeUpdatePostUseCase() {
  const postRepository = new PostsRepository();
  const updatePostUseCase = new UpdatePostUseCase(postRepository);
  return updatePostUseCase;
}

// src/controllers/teachers/posts/update-post.ts
var import_zod5 = require("zod");
function updatePost(req, res) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod5.z.object({
      id_post: import_zod5.z.coerce.number()
    });
    const registerBodySchema = import_zod5.z.object({
      id_teacher: import_zod5.z.string(),
      id_subject: import_zod5.z.coerce.number(),
      post_text: import_zod5.z.string(),
      post_title: import_zod5.z.string(),
      post_date: import_zod5.z.coerce.date().default(() => /* @__PURE__ */ new Date())
    });
    const { id_post } = registerParamsSchema.parse(req.params);
    const { id_teacher, id_subject, post_text, post_title, post_date } = registerBodySchema.parse(req.body);
    const updatePostUseCase = makeUpdatePostUseCase();
    const post = yield updatePostUseCase.handler({
      id_post,
      id_teacher,
      id_subject,
      post_text,
      post_title,
      post_date
    });
    return res.status(201).send(post);
  });
}

// src/routes/teacher-routes/teacher-routes.ts
var teacherRouter = (0, import_express.Router)();
teacherRouter.post("/post", createPost);
teacherRouter.delete("/post/:id_post", deletePost);
teacherRouter.put("/post/:id_post", updatePost);
teacherRouter.get("/posts", findAllPosts);
var teacher_routes_default = teacherRouter;
