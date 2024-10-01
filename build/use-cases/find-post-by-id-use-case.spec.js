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

// src/use-cases/find-post-by-id-use-case.spec.ts
var import_vitest = require("vitest");

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

// src/use-cases/find-post-by-id-use-case.spec.ts
(0, import_vitest.describe)("FindPostByIdUseCase", () => {
  (0, import_vitest.it)("should call postRepository.findPostById with the correct id_post", () => __async(exports, null, function* () {
    const postRepository = {
      findPostById: import_vitest.vi.fn().mockResolvedValueOnce({
        id_post: 1,
        id_teacher: "teacher-123",
        id_subject: 101,
        post_text: "This is a post text",
        post_title: "Post Title",
        post_date: /* @__PURE__ */ new Date("2024-01-01")
      }),
      createPost: import_vitest.vi.fn(),
      findAllPosts: import_vitest.vi.fn(),
      updatePost: import_vitest.vi.fn(),
      deletePost: import_vitest.vi.fn(),
      keyWordSearch: import_vitest.vi.fn()
    };
    const findPostByIdUseCase = new FindPostByIdUseCase(postRepository);
    const id_post = 1;
    const result = yield findPostByIdUseCase.handler(id_post);
    (0, import_vitest.expect)(postRepository.findPostById).toHaveBeenCalledWith(id_post);
    (0, import_vitest.expect)(result).toEqual({
      id_post: 1,
      id_teacher: "teacher-123",
      id_subject: 101,
      post_text: "This is a post text",
      post_title: "Post Title",
      post_date: /* @__PURE__ */ new Date("2024-01-01")
    });
  }));
});
