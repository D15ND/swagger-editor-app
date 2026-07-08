export const DEFAULT_SCHEMA = JSON.stringify(
  {
    openapi: '3.0.0',
    info: {
      title: 'Sample Pet Store App',
      description: 'This is a sample server for a pet store.',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://api.example.com/v1',
        description: 'Optional server description, e.g. Main (production) server',
      },
    ],
    paths: {
      '/pets': {
        get: {
          summary: 'Returns all pets',
          description: 'Returns a map of status codes to quantities',
          responses: {
            '200': {
              description: 'successful operation',
            },
          },
        },
        post: {
          summary: 'Add a new pet to the store',
          description: 'Add a new pet to the store',
          responses: {
            '405': {
              description: 'Invalid input',
            },
          },
        },
      },
      '/pets/{petId}': {
        get: {
          summary: 'Find pet by ID',
          description: 'Returns a single pet',
          parameters: [
            {
              name: 'petId',
              in: 'path',
              description: 'ID of pet to return',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'successful operation',
            },
            '400': {
              description: 'Invalid ID supplied',
            },
            '404': {
              description: 'Pet not found',
            },
          },
        },
        delete: {
          summary: 'Deletes a pet',
          description: 'Deletes a pet',
          parameters: [
            {
              name: 'petId',
              in: 'path',
              description: 'Pet id to delete',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '400': {
              description: 'Invalid ID supplied',
            },
            '404': {
              description: 'Pet not found',
            },
          },
        },
      },
    },
  },
  null,
  2,
);
