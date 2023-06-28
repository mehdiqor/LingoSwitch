/**
 * @swagger
 *  components:
 *      schemas:
 *          SignForm:
 *              type: object
 *              required:
 *                  -   email
 *                  -   password
 *              properties:
 *                  email:
 *                      type: string
 *                      description: enter your email
 *                  password:
 *                      type: string
 *                      description: enter your password
 */

/**
 * @swagger
 *  /user/register:
 *      post:
 *          tags: [User-Auth]
 *          summary: signup user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/SignForm'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SignForm'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */
/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags: [User-Auth]
 *          summary: signin user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/SignForm'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SignForm'
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */
/**
 * @swagger
 *  /user/refreshToken:
 *      get:
 *          tags: [User-Auth]
 *          summary: get a new token
 *          responses:
 *              200:
 *                  description: success
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
/**
 * @swagger
 *  /user/logout:
 *      get:
 *          tags: [User-Auth]
 *          summary: sign out
 *          responses:
 *              200:
 *                  description: success
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
