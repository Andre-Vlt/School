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

// src/use-cases/create-post-use-case.spec.ts
var import_vitest = require("vitest");

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

// src/use-cases/create-post-use-case.spec.ts
(0, import_vitest.describe)("CreatePostUseCase", () => {
  (0, import_vitest.it)("should call postRepository.createPost with the correct post", () => __async(exports, null, function* () {
    const postRepository = {
      createPost: import_vitest.vi.fn().mockResolvedValueOnce({
        id_post: 1,
        id_teacher: "teacher-shcool-fiap",
        id_subject: 101,
        post_text: "This is a post test",
        post_title: "Post Title Test",
        post_date: /* @__PURE__ */ new Date("2024-01-01")
      }),
      findAllPosts: import_vitest.vi.fn(),
      findPostById: import_vitest.vi.fn(),
      updatePost: import_vitest.vi.fn(),
      deletePost: import_vitest.vi.fn(),
      keyWordSearch: import_vitest.vi.fn()
    };
    const createPostUseCase = new CreatePostUseCase(postRepository);
    const post = {
      id_teacher: "teacher-shcool-fiap",
      id_subject: 101,
      post_text: "This is a post test",
      post_title: "Post Title Test",
      post_date: /* @__PURE__ */ new Date("2024-01-01")
    };
    const result = yield createPostUseCase.handler(post);
    (0, import_vitest.expect)(postRepository.createPost).toHaveBeenCalledWith(post);
    (0, import_vitest.expect)(result).toEqual({
      id_post: 1,
      id_teacher: "teacher-shcool-fiap",
      id_subject: 101,
      post_text: "This is a post test",
      post_title: "Post Title Test",
      post_date: /* @__PURE__ */ new Date("2024-01-01")
    });
  }));
});
