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

// src/use-cases/update-post-use-case.spec.ts
var import_vitest = require("vitest");

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

// src/use-cases/update-post-use-case.spec.ts
(0, import_vitest.describe)("UpdatePostUseCase", () => {
  (0, import_vitest.it)("should call postRepository.updatePost with the correct post", () => __async(exports, null, function* () {
    const postRepository = {
      updatePost: import_vitest.vi.fn().mockResolvedValueOnce({
        id_post: 1,
        id_teacher: "teacher-123",
        id_subject: 101,
        post_text: "This is an updated post text",
        post_title: "Updated Post Title",
        post_date: /* @__PURE__ */ new Date("2024-01-01")
      }),
      createPost: import_vitest.vi.fn(),
      findAllPosts: import_vitest.vi.fn(),
      findPostById: import_vitest.vi.fn(),
      deletePost: import_vitest.vi.fn(),
      keyWordSearch: import_vitest.vi.fn()
    };
    const updatePostUseCase = new UpdatePostUseCase(postRepository);
    const post = {
      id_post: 1,
      id_teacher: "teacher-123",
      id_subject: 101,
      post_text: "This is an updated post text",
      post_title: "Updated Post Title",
      post_date: /* @__PURE__ */ new Date("2024-01-01")
    };
    const result = yield updatePostUseCase.handler(post);
    (0, import_vitest.expect)(postRepository.updatePost).toHaveBeenCalledWith(post);
    (0, import_vitest.expect)(result).toEqual({
      id_post: 1,
      id_teacher: "teacher-123",
      id_subject: 101,
      post_text: "This is an updated post text",
      post_title: "Updated Post Title",
      post_date: /* @__PURE__ */ new Date("2024-01-01")
    });
  }));
});
