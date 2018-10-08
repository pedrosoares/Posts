import PostController from '../controllers/PostController';

module.exports = function(app) {

    const controller = new PostController();

    // todoList Routes
    app.route('/posts')
        .get(controller.listAllPosts)
        .post(controller.createPost);

    /*app.route('/tasks/:taskId')
        .get(controller.read_a_task)
        .put(controller.update_a_task)
        .delete(controller.delete_a_task);*/
};
