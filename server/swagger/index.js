//      CREATE USER ACCOUNT

/**
 * @swagger
 * /auth/v1/create-user:
 *  post:
 *     tags:
 *     - Users
 *     summary: Employee and admin can create a user account
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *           properties:
 *               email:
 *                   type: string
 *               password:
 *                   type: string
 *           example:
 *               firstName: "goodness"
 *               lastName: "ose"
 *               email: "goodness@gmail.com"
 *               password: "password123"
 *               gender: "Male"
 *               jobRole: "developer"
 *               department: "Admin"
 *               isAdmin: false
 *               address: "rsadfaloot"
 *     responses:
 *      201:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */

//        SIGN IN TO YOUR ACCOUNT

/**
 * @swagger
 * /auth/v1/signin:
 *  post:
 *      tags:
 *          - Users
 *      summary: "Returns Authorization Token"
 *      description: "Authorizes default users with username and password set as root to use the endpoints"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *                  example:
 *                      email: "goodness@gmail.com"
 *                      password: "password123"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Authorization token"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                          "data": "token"
 *
 */

//         TESTING

/**
 * @swagger
 * /:
 *  get:
 *    summary: This api is used to check if get method is working or not
 *    description: This api is used to check if get method is working or not
 *    responses:
 *          200:
 *              description: To test Get method
 */

//        GET ALL ARTICLES

/**
 * @swagger
 * /v1/articles:
 *  get:
 *      tags:
 *         - Articles
 *      security:              # <--- ADD THIS
 *          - bearerAuth: []     # <--- ADD THIS
 *      summary: To get all articles posted on the blog
 *      description: This api is used to fetch all articles posted
 *      responses:
 *          200:
 *               description: This api is used to fetch all the articles posted
 *               content:
 *                    application/json:
 *                           schema:
 *                                type: object
 *                                items:
 */

//       GET SPECIFIC ARTICLE ONCE THE ID IS PROVIDED

/**
 * @swagger
 * /v1/articles/{articleId}:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Articles
 *     summary: Get a single Article with id
 *     parameters:
 *      - name: articleId
 *        in: path
 *        description: The unique id of an article
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */

//   POST AN ARTICLE TO THE DB

/**
 * @swagger
 * /v1/articles:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Articles
 *     summary: Create an article
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            example:
 *               title: "NIGERIA ELECTION 2023"
 *               article: "This post is all about politics and the dangers of political apaty"
 *               categoryId: "2"
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */

//   UPDATE OR EDIT AN ARTICLE

/**
 * @swagger
 * /v1/articles/{articleId}:
 *  patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Articles
 *     summary: Update a single Article with id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *           example:
 *               title: "NIGERIA ELECTION 2023"
 *               article: "This post is all about politics and the dangers of political apaty"
 *     parameters:
 *      - name: articleId
 *        in: path
 *        description: The unique id of an article
 *        required: true
 *     responses:
 *      201:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */

//       DELETE AN ARTICLE

/**
 * @swagger
 * /v1/articles/{articleId}:
 *  delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Articles
 *     summary: Delete a single Article with id
 *     parameters:
 *      - name: articleId
 *        in: path
 *        description: The unique id of an article
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */

//      GET ALL GIFS POSTED

/**
 * @swagger
 * /v1/gifs:
 *  get:
 *      tags:
 *         - Gifs
 *      security:              # <--- ADD THIS
 *          - bearerAuth: []     # <--- ADD THIS
 *      summary: To get all gif posted on the blog
 *      description: This api is used to fetch all gif posted
 *      responses:
 *          200:
 *               description: This api is used to fetch all the gif posted
 *               content:
 *                    application/json:
 *                           schema:
 *                                type: object
 *                                items:
 */

//    GET A SPECIFIC GIF POSTED

/**
 * @swagger
 * /v1/gifs/{gifId}:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Gifs
 *     summary: Get a single gif with id
 *     parameters:
 *      - name: gifId
 *        in: path
 *        description: The unique id of an gif
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */

//     POST A GIF ING

/**
 * @swagger
 * /v1/gifs:
 *  post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *       - Gifs
 *       summary: Post a Gif to the DB
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *                 title:
 *                   type: string
 *       responses:
 *         201:
 *           description: "Status Created"
 *         500:
 *           description: "Error importing file"
 */

//      DELETE A GIF

/**
 * @swagger
 * /v1/gifs/{gifId}:
 *  delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Gifs
 *     summary: Delete a single Gif with id
 *     parameters:
 *      - name: gifId
 *        in: path
 *        description: The unique id of a Gif img
 *        required: true
 *     responses:
 *      202:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */

// =============

//      CREATE AN ARTICLE COMMENT

// =============

/**
 * @swagger
 * /v1/articles/{articleId}/comment:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Article Comment
 *     summary: Post comment in an article
 *     parameters:
 *      - name: articleId
 *        in: path
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *           example:
 *               comment: "My comment on politics"
 *               flagged: "false"
 *     responses:
 *      201:
 *        description: Comment created successfully
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */

// =============

//      CREATE A GIF COMMENT

// =============

/**
 * @swagger
 * /v1/gifs/{gifId}/comment:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Gif Comment
 *     summary: Post comment in a Gif
 *     parameters:
 *      - name: gifId
 *        in: path
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *           example:
 *               comment: "My comment on this vintage shirt"
 *     responses:
 *      201:
 *        description: Comment created successfully
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */

// =============

//      FLAG AN ARTICLE THAT IS INAPPROPRIATE

// =============

/**
 * @swagger
 * /v1/articles/{articleId}/flag:
 *  patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Flag Route
 *     summary: Flag an article that is inappropriate
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *           example:
 *               flagged: "true"
 *     parameters:
 *      - name: articleId
 *        in: path
 *        description: The unique id of an article
 *        required: true
 *     responses:
 *      201:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */

// =============

//      CREATE A CATEGORY

// =============

/**
 * @swagger
 * /v1/categories:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Category
 *     summary: Create a Category
 *     description: Category must be specific and unique
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            example:
 *               categoryName: "Sports"
 *     responses:
 *      201:
 *        description: Category Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
//

// =============   FEEDS

/**
 * @swagger
 * /v1/feeds:
 *  get:
 *      tags:
 *         - FEEDS
 *      security:              # <--- ADD THIS
 *          - bearerAuth: []     # <--- ADD THIS
 *      summary: To get all the fields posted on the blog
 *      description: This api is used to fetch the combination of both articles and gif with the number of likes and comments in each of them
 *      responses:
 *          200:
 *               description: This api is used to fetch all the fields posted
 *               content:
 *                    application/json:
 *                           schema:
 *                                type: object
 *                                items:
 */

//      ADD USER PHONE NUMBER

// =============

/**
 * @swagger
 * /auth/v1/number:
 *  patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Users
 *     summary: Add or change user phone number
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *           example:
 *               number: "+2348023421333"
 *     responses:
 *      201:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */

//     UPLOAD USER PFOFILE PHOTO

/**
 * @swagger
 * /auth/v1/upload_pix:
 *  patch:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *       - Users
 *       summary: Upload user profile photo
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *       responses:
 *         201:
 *           description: "Status Created"
 *         500:
 *           description: "Error importing file"
 */
//     UPLOAD USER COVER PHOTO

/**
 * @swagger
 * /auth/v1/cover_photo:
 *  patch:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *       - Users
 *       summary: Upload user cover photo
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 photo:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *       responses:
 *         201:
 *           description: "Status Created"
 *         500:
 *           description: "Error importing file"
 */

/**
 * @swagger
 * /auth/v1/change_password:
 *  patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Users
 *     summary: Change user password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *           example:
 *               previousPassword: "Enter Previous password"
 *               newPassword: "Enter New password"
 *               confirmPassword: "Confirm password"
 *     responses:
 *      201:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */

//      Like article

// =============
/**
 * @swagger
 * /v1/articles/{articleId}/like:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Articles
 *     summary: To like a particular article
 *     content:
 *        application/json:
 *           schema:
 *           type: object
 *     parameters:
 *      - name: articleId
 *        in: path
 *        description: The unique id of an article
 *        required: true
 *     responses:
 *      201:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */
//      Like Gif

// =============
/**
 * @swagger
 * /v1/gifs/{gifId}/gif_likes:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Gifs
 *     summary: To like a particular Gif
 *     content:
 *        application/json:
 *           schema:
 *           type: object
 *     parameters:
 *      - name: gifId
 *        in: path
 *        description: The unique id of a gif
 *        required: true
 *     responses:
 *      201:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */
