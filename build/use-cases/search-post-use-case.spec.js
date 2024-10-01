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

// src/use-cases/search-post-use-case.spec.ts
var import_vitest = require("vitest");

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

// src/use-cases/search-post-use-case.spec.ts
(0, import_vitest.describe)("SearchPostUseCase", () => {
  (0, import_vitest.it)("should call postsRepository.keyWordSearch with the correct keyWord", () => __async(exports, null, function* () {
    const postRepository = {
      keyWordSearch: import_vitest.vi.fn().mockResolvedValueOnce([
        {
          id_post: 1,
          id_teacher: "teacher-123",
          id_subject: 101,
          post_text: "This is a post about testing",
          post_title: "Post Title",
          post_date: /* @__PURE__ */ new Date("2024-01-01")
        },
        {
          id_post: 2,
          id_teacher: "teacher-456",
          id_subject: 102,
          post_text: "Another post related to testing",
          post_title: "Another Post Title",
          post_date: /* @__PURE__ */ new Date("2024-02-01")
        }
      ]),
      createPost: import_vitest.vi.fn(),
      findAllPosts: import_vitest.vi.fn(),
      findPostById: import_vitest.vi.fn(),
      updatePost: import_vitest.vi.fn(),
      deletePost: import_vitest.vi.fn()
    };
    const searchPostUseCase = new SearchPostUseCase(postRepository);
    const keyWord = "testing";
    const result = yield searchPostUseCase.handler(keyWord);
    (0, import_vitest.expect)(postRepository.keyWordSearch).toHaveBeenCalledWith(keyWord);
    (0, import_vitest.expect)(result).toEqual([
      {
        id_post: 1,
        id_teacher: "teacher-123",
        id_subject: 101,
        post_text: "This is a post about testing",
        post_title: "Post Title",
        post_date: /* @__PURE__ */ new Date("2024-01-01")
      },
      {
        id_post: 2,
        id_teacher: "teacher-456",
        id_subject: 102,
        post_text: "Another post related to testing",
        post_title: "Another Post Title",
        post_date: /* @__PURE__ */ new Date("2024-02-01")
      }
    ]);
  }));
});
