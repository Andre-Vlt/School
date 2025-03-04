// src/swagger-output.json
var openapi = "3.0.0";
var info = {
  title: "School Posts API",
  description: "API that can manage posts that teachers create and students can see",
  version: "1.0.0"
};
var servers = [
  {
    url: "http://localhost:3000",
    description: "Local server"
  },
  {
    url: "https://school-bqfd.onrender.com",
    description: "Production server"
  }
];
var paths = {
  "/adm/user": {
    post: {
      summary: "Create a new user",
      description: "Admin users will be able to create new users",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  example: "john_doe"
                },
                password: {
                  type: "string",
                  example: "123456"
                }
              },
              required: ["username", "password"]
            }
          }
        }
      },
      responses: {
        "201": {
          description: "Created"
        },
        "400": {
          description: "Bad Request"
        }
      }
    }
  },
  "/adm/person": {
    post: {
      summary: "Create a new person",
      description: "Admin users will be able to create a new person",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id_user: {
                  type: "string",
                  example: "insert the uuid generated at the creation of the user"
                },
                name: {
                  type: "string",
                  example: "John Doe"
                },
                email: {
                  type: "string",
                  example: "johnthedoe@email.com"
                },
                birth: {
                  type: "Date",
                  example: "1990-01-01"
                },
                cpf: {
                  type: "string",
                  example: "123.456.789-00"
                }
              },
              required: ["id_user", "name", "email", "birth", "cpf"]
            }
          }
        }
      },
      responses: {
        "201": {
          description: "Created"
        },
        "400": {
          description: "Bad Request"
        }
      }
    }
  },
  "/adm/teacher": {
    post: {
      summary: "Create a new teacher",
      description: "Admin users will be able to create a new teacher",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id_person: {
                  type: "string",
                  example: "insert the uuid generated at the creation of the person"
                },
                id_subject: {
                  type: "string",
                  example: "1"
                }
              },
              required: ["id_person", "id_subject"]
            }
          }
        }
      },
      responses: {
        "201": {
          description: "Created"
        }
      }
    }
  },
  "/adm/student": {
    post: {
      summary: "Create a new student",
      description: "Admin users will be able to create a new student",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id_person: {
                  type: "string",
                  example: "insert the uuid generated at the creation of the person"
                },
                grade: {
                  type: "string",
                  example: "9"
                }
              },
              required: ["id_person", "grade"]
            }
          }
        }
      },
      responses: {
        "201": {
          description: "Created"
        }
      }
    }
  },
  "/teacher/post": {
    post: {
      summary: "Create a new post",
      description: "Teachers will be able to create new posts",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id_teacher: {
                  type: "string",
                  example: "insert the uuid generated at the creation of the teacher"
                },
                id_subject: {
                  type: "string",
                  example: "2"
                },
                post_text: {
                  type: "string",
                  example: "The text of the post can be anything, teaching about anything, as long as it is a string.\n\nIt can have multiple lines and paragraphs if you use the escape character \\n"
                },
                post_title: {
                  type: "string",
                  example: "The title of the post can be anything, as long as it is a string."
                },
                post_date: {
                  type: "Date",
                  example: "2021-01-01"
                }
              },
              required: ["id_teacher", "id_subject", "post_text", "post_title", "post_date"]
            }
          }
        }
      },
      responses: {
        "201": {
          description: "Created"
        },
        "400": {
          description: "Bad Request"
        }
      }
    }
  },
  "/teacher/post/{id_post}": {
    delete: {
      summary: "Delete a post",
      description: "Teachers will be able to delete posts",
      parameters: [
        {
          name: "id_post",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "post uuid goes here"
          }
        }
      ],
      responses: {
        "201": {
          description: "Created"
        },
        "400": {
          description: "Bad Request"
        }
      }
    },
    put: {
      summary: "Update a post",
      description: "Teachers will be able to update posts",
      parameters: [
        {
          name: "id_post",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "post uuid goes here"
          }
        }
      ],
      responses: {
        "201": {
          description: "Created"
        },
        "400": {
          description: "Bad Request"
        }
      }
    }
  },
  "/teacher/posts": {
    get: {
      summary: "Get all posts",
      description: "Teachers will obtain all posts in database",
      responses: {
        "200": {
          description: "OK"
        },
        "400": {
          description: "Bad Request"
        }
      }
    }
  },
  "/student/posts": {
    get: {
      summary: "Get all posts",
      description: "Students will obtain all posts in database",
      responses: {
        "200": {
          description: "OK"
        },
        "400": {
          description: "Bad Request"
        }
      }
    }
  },
  "/student/posts/{id_post}": {
    get: {
      summary: "Get a post",
      description: "Students will obtain the post with the id passed in the path",
      parameters: [
        {
          name: "id_post",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "post uuid goes here"
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
      summary: "Search for a post with certain words",
      description: "Students will be able to search for posts with certain words",
      parameters: [
        {
          name: "keyWord",
          in: "query",
          required: false,
          schema: {
            type: "string",
            example: "search words go here"
          }
        }
      ],
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
