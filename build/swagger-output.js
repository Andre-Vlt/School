// src/swagger-output.json
var openapi = "3.0.0";
var info = {
  title: "API",
  description: "API",
  version: "1.0.0"
};
var servers = [
  {
    url: "http://localhost:3000"
  }
];
var paths = {
  "/adm/user": {
    post: {
      description: "",
      responses: {
        "201": {
          description: "Created"
        }
      }
    }
  },
  "/adm/person": {
    post: {
      description: "",
      responses: {
        "201": {
          description: "Created"
        }
      }
    }
  },
  "/adm/teacher": {
    post: {
      description: "",
      responses: {
        "201": {
          description: "Created"
        }
      }
    }
  },
  "/adm/student": {
    post: {
      description: "",
      responses: {
        "201": {
          description: "Created"
        }
      }
    }
  },
  "/teacher/post": {
    post: {
      description: "",
      responses: {
        "201": {
          description: "Created"
        }
      }
    }
  },
  "/teacher/post/{id_post}": {
    delete: {
      description: "",
      parameters: [
        {
          name: "id_post",
          in: "path",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      responses: {
        "201": {
          description: "Created"
        }
      }
    },
    put: {
      description: "",
      parameters: [
        {
          name: "id_post",
          in: "path",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      responses: {
        "201": {
          description: "Created"
        }
      }
    }
  },
  "/teacher/posts": {
    get: {
      description: "",
      responses: {
        "200": {
          description: "OK"
        }
      }
    }
  },
  "/student/posts": {
    get: {
      description: "",
      responses: {
        "200": {
          description: "OK"
        }
      }
    }
  },
  "/student/posts/{id_post}": {
    get: {
      description: "",
      parameters: [
        {
          name: "id_post",
          in: "path",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      responses: {
        "200": {
          description: "OK"
        }
      }
    }
  },
  "/student/search": {
    get: {
      description: "",
      responses: {
        "200": {
          description: "OK"
        }
      }
    }
  }
};
var swagger_output_default = {
  openapi,
  info,
  servers,
  paths
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  info,
  openapi,
  paths,
  servers
});
