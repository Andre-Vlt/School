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

// src/use-cases/delete-post-use-case.spec.ts
var import_vitest = require("vitest");

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

// src/use-cases/delete-post-use-case.spec.ts
(0, import_vitest.describe)("DeletePostUseCase", () => {
  (0, import_vitest.it)("should call postRepository.deletePost with the correct id_post", () => __async(exports, null, function* () {
    const postRepository = {
      deletePost: import_vitest.vi.fn().mockResolvedValueOnce({ Success: "Post deleted successfully" }),
      createPost: import_vitest.vi.fn(),
      findAllPosts: import_vitest.vi.fn(),
      findPostById: import_vitest.vi.fn(),
      updatePost: import_vitest.vi.fn(),
      keyWordSearch: import_vitest.vi.fn()
    };
    const deletePostUseCase = new DeletePostUseCase(postRepository);
    const id_post = 1;
    const result = yield deletePostUseCase.handler(id_post);
    (0, import_vitest.expect)(postRepository.deletePost).toHaveBeenCalledWith(id_post);
    (0, import_vitest.expect)(result).toEqual({ Success: "Post deleted successfully" });
  }));
});
