/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                  en:
 *                      type: string
 *                      required: false
 *                  fr:
 *                      type: string
 *                      required: false
 *                  de:
 *                      type: string
 *                      required: false
 *                  fa:
 *                      type: string
 *                      required: false
 */

/**
 * @swagger
 *  /blog/add:
 *      post:
 *          tags: [Blog]
 *          summary: create blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
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
 *  /blog/{id}:
 *      get:
 *          tags: [Blog]
 *          summary: get blog bt ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
