import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDocument = {
    openapi: "3.0.0",
    info: {title: "Clinic API", version: "1.0.0"},
    paths: {
        "/auth/register": {
            post: {
                summary: "Register a new user",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {email: {type: "string"}, password: {type: "string"}}
                            }
                        }
                    },
                },
                responses: {"201": {description: "User registered"}},
            },
        },
        "/auth/login": {
            post: {
                summary: "Login user",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {email: {type: "string"}, password: {type: "string"}}
                            }
                        }
                    },
                },
                responses: {"200": {description: "Login successful"}},
            },
        },
        "/auth/reset-password": {
            post: {
                summary: "Reset password",
                requestBody: {
                    content: {"application/json": {schema: {type: "object", properties: {email: {type: "string"}}}}},
                },
                responses: {"200": {description: "Reset email sent"}},
            },
        },
        "/clinics": {
            post: {
                summary: "Create clinic",
                security: [{bearerAuth: []}],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {type: "string"},
                                    address: {type: "string"},
                                    city: {type: "string"},
                                    rating: {type: "number"}
                                }
                            },
                        },
                    },
                },
                responses: {"201": {description: "Clinic created"}},
            },
            get: {
                summary: "Get clinics",
                parameters: [
                    {in: "query", name: "city", schema: {type: "string"}},
                    {in: "query", name: "name", schema: {type: "string"}},
                    {in: "query", name: "service", schema: {type: "string"}},
                    {in: "query", name: "doctor", schema: {type: "string"}},
                    {in: "query", name: "sortByName", schema: {type: "string"}},
                ],
                responses: {"200": {description: "List of clinics"}},
            },
        },
        "/clinics/{id}": {
            get: {
                summary: "Get clinic by ID",
                parameters: [{in: "path", name: "id", required: true, schema: {type: "string"}}],
                responses: {"200": {description: "Clinic details"}},
            },
            put: {
                summary: "Update clinic",
                security: [{bearerAuth: []}],
                parameters: [{in: "path", name: "id", required: true, schema: {type: "string"}}],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {type: "string"},
                                    address: {type: "string"},
                                    city: {type: "string"},
                                    rating: {type: "number"}
                                }
                            }
                        }
                    },
                },
                responses: {"200": {description: "Clinic updated"}},
            },
            delete: {
                summary: "Delete clinic",
                security: [{bearerAuth: []}],
                parameters: [{in: "path", name: "id", required: true, schema: {type: "string"}}],
                responses: {"200": {description: "Clinic deleted"}},
            },
        },
        "/doctors": {
            post: {
                summary: "Create doctor",
                security: [{bearerAuth: []}],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {type: "string"},
                                    surname: {type: "string"},
                                    phone: {type: "string"},
                                    email: {type: "string"},
                                    specialty: {type: "string"},
                                    clinics: {type: "array", items: {type: "string"}},
                                    services: {type: "array", items: {type: "string"}}
                                }
                            },
                        },
                    },
                },
                responses: {"201": {description: "Doctor created"}},
            },
            get: {
                summary: "Get doctors",
                parameters: [
                    {in: "query", name: "name", schema: {type: "string"}},
                    {in: "query", name: "surname", schema: {type: "string"}},
                    {in: "query", name: "phone", schema: {type: "string"}},
                    {in: "query", name: "email", schema: {type: "string"}},
                    {in: "query", name: "specialty", schema: {type: "string"}},
                    {in: "query", name: "sortByName", schema: {type: "string"}},
                ],
                responses: {"200": {description: "List of doctors"}},
            },
        },
        "/doctors/{id}": {
            get: {
                summary: "Get doctor by ID",
                parameters: [{in: "path", name: "id", required: true, schema: {type: "string"}}],
                responses: {"200": {description: "Doctor details"}},
            },
            put: {
                summary: "Update doctor",
                security: [{bearerAuth: []}],
                parameters: [{in: "path", name: "id", required: true, schema: {type: "string"}}],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {type: "string"},
                                    surname: {type: "string"},
                                    phone: {type: "string"},
                                    email: {type: "string"},
                                    specialty: {type: "string"},
                                    clinics: {type: "array", items: {type: "string"}},
                                    services: {type: "array", items: {type: "string"}}
                                }
                            }
                        },
                    },
                    responses: {"200": {description: "Doctor updated"}},
                },
                delete: {
                    summary: "Delete doctor",
                    security: [{bearerAuth: []}],
                    parameters: [{in: "path", name: "id", required: true, schema: {type: "string"}}],
                    responses: {"200": {description: "Doctor deleted"}},
                },
            },
            "/services": {
                post: {
                    summary: "Create service",
                    security: [{bearerAuth: []}],
                    requestBody: {
                        content: {"application/json": {schema: {type: "object", properties: {name: {type: "string"}}}}},
                    },
                    responses: {"201": {description: "Service created"}},
                },
                get: {
                    summary: "Get services",
                    parameters: [
                        {in: "query", name: "name", schema: {type: "string"}},
                        {in: "query", name: "sortByName", schema: {type: "string"}},
                    ],
                    responses: {"200": {description: "List of services"}},
                },
            },
            "/services/{id}": {
                get: {
                    summary: "Get service by ID",
                    parameters: [{in: "path", name: "id", required: true, schema: {type: "string"}}],
                    responses: {"200": {description: "Service details"}},
                },
                put: {
                    summary: "Update service",
                    security: [{bearerAuth: []}],
                    parameters: [{in: "path", name: "id", required: true, schema: {type: "string"}}],
                    requestBody: {
                        content: {"application/json": {schema: {type: "object", properties: {name: {type: "string"}}}}},
                    },
                    responses: {"200": {description: "Service updated"}},
                },
                delete: {
                    summary: "Delete service",
                    security: [{bearerAuth: []}],
                    parameters: [{in: "path", name: "id", required: true, schema: {type: "string"}}],
                    responses: {"200": {description: "Service deleted"}},
                },
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {type: "http", scheme: "bearer", bearerFormat: "JWT"},
            },
        }
    }
};
    export const setupSwagger = (app: Express) => {
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    };