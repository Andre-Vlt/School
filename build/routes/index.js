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

// src/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express4 = require("express");

// src/routes/administration-routes/adm-routes.ts
var import_express = require("express");

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

// src/routes/teacher-routes/teacher-routes.ts
var import_express2 = require("express");

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
var import_zod6 = require("zod");
function createPost(req, res) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod6.z.object({
      id_teacher: import_zod6.z.string(),
      id_subject: import_zod6.z.coerce.number(),
      post_text: import_zod6.z.string(),
      post_title: import_zod6.z.string(),
      post_date: import_zod6.z.coerce.date().default(() => /* @__PURE__ */ new Date())
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
var import_zod7 = require("zod");
function deletePost(req, res) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod7.z.object({
      id_post: import_zod7.z.coerce.number()
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
var import_zod8 = require("zod");
function findAllPosts(req, res) {
  return __async(this, null, function* () {
    const registerQuerySchema = import_zod8.z.object({
      page: import_zod8.z.coerce.number().default(1),
      limit: import_zod8.z.coerce.number().default(5)
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
var import_zod9 = require("zod");
function updatePost(req, res) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod9.z.object({
      id_post: import_zod9.z.coerce.number()
    });
    const registerBodySchema = import_zod9.z.object({
      id_teacher: import_zod9.z.string(),
      id_subject: import_zod9.z.coerce.number(),
      post_text: import_zod9.z.string(),
      post_title: import_zod9.z.string(),
      post_date: import_zod9.z.coerce.date().default(() => /* @__PURE__ */ new Date())
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
var teacherRouter = (0, import_express2.Router)();
teacherRouter.post("/post", createPost);
teacherRouter.delete("/post/:id_post", deletePost);
teacherRouter.put("/post/:id_post", updatePost);
teacherRouter.get("/posts", findAllPosts);
var teacher_routes_default = teacherRouter;

// src/routes/students-routes/student-routes.ts
var import_express3 = require("express");

// src/use-cases/find-post-by-id-use-case.ts
var FindPostByIdUseCase = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handler(id_post) {
    return __async(this, null, function* () {
      return this.postRepository.findPostById(id_post);
    });
  }
};

// src/use-cases/factory/make-find-post-by-id-use-case.ts
function makeFindPostByIdUseCase() {
  const postRepository = new PostsRepository();
  const findPostByIdUseCase = new FindPostByIdUseCase(postRepository);
  return findPostByIdUseCase;
}

// src/controllers/students/find-post-by-id.ts
var import_zod10 = require("zod");
function FindPostById(req, res) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod10.z.object({
      id_post: import_zod10.z.coerce.number()
    });
    const { id_post } = registerParamsSchema.parse(req.params);
    const findPostByIdUseCase = makeFindPostByIdUseCase();
    const post = yield findPostByIdUseCase.handler(id_post);
    return res.status(200).send(post);
  });
}

// src/use-cases/search-post-use-case.ts
var SearchPostUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  handler(keyWord) {
    return __async(this, null, function* () {
      return yield this.postsRepository.keyWordSearch(keyWord);
    });
  }
};

// src/use-cases/factory/make-search-post-use-case.ts
function makeSearchPostUseCase() {
  const postsRepository = new PostsRepository();
  const makeSearchPostUseCase2 = new SearchPostUseCase(postsRepository);
  return makeSearchPostUseCase2;
}

// src/controllers/students/search-post-using-keyword.ts
var import_zod11 = require("zod");
function KeywordSearchPost(req, res) {
  return __async(this, null, function* () {
    const registerQuerySchema = import_zod11.z.object({
      keyWord: import_zod11.z.string()
    });
    const { keyWord } = registerQuerySchema.parse(req.query);
    const searchPostUseCase = makeSearchPostUseCase();
    const posts = yield searchPostUseCase.handler(keyWord);
    return res.status(200).send(posts);
  });
}

// src/routes/students-routes/student-routes.ts
var studentRoutes = (0, import_express3.Router)();
studentRoutes.get("/posts", findAllPosts);
studentRoutes.get("/posts/:id_post", FindPostById);
studentRoutes.get("/search", KeywordSearchPost);
var student_routes_default = studentRoutes;

// src/routes/index.ts
var routes = (0, import_express4.Router)();
routes.use("/adm", adm_routes_default);
routes.use("/teacher", teacher_routes_default);
routes.use("/student", student_routes_default);
var routes_default = routes;
