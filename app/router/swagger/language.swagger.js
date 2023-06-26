/**
 * @swagger
 *  components:
 *      schemas:
 *          Language:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 */

/**
 * @swagger
 *  /language/{lng}:
 *      get:
 *          tags: [Language]
 *          summary: change language
 *          parameters:
 *              -   in: path
 *                  name: lng
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
/**
 * @swagger
 *  /language:
 *      get:
 *          tags: [Language]
 *          summary: get language
 *          responses:
 *              200:
 *                  description: success
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
