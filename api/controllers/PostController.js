import mongoose from 'mongoose';
import request from 'request';

const Post = mongoose.model('Post');

export default class PostController {

    listAllPosts(req, res) {
        let offset = (req.params.hasOwnProperty("offset") ? offset = req.params.offset : 0);

        Post.paginate({}, { offset: offset, limit: 10 }, function(err, result) {
            if (err)
                res.send(err);
            // result.docs
            // result.total
            // result.limit - 10
            // result.offset - 20

            const users_ids = result.docs.map(doc => doc.user_id);

            const headers = Object.assign(req.headers, {
                'content-type': 'text/json'
            });

            request({
                headers: headers,
                uri: 'http://localhost:8081/auth/users',
                body: JSON.stringify({
                    users: users_ids
                }),
                method: 'POST'
            }, function (err, res_, body) {
                if (err)
                    res.send(err);

                const users = JSON.parse(body);

                result.docs = result.docs.map(doc => {
                    return Object.assign({
                        author: users.find(user => user.id === doc.user_id)
                    }, JSON.parse(JSON.stringify(doc)));
                });

                res.json(result);
            });
        });
    }

    createPost(req, res) {
        request({
            headers: req.headers,
            uri: 'http://localhost:8081/auth/me',
            body: "",
            method: 'POST'
        }, function (err, res_, body) {
            if (err)
                res.send(err);

            const user = JSON.parse(body);

            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                user_id: user.id,
            });
            post.save(function(err, task) {
                if (err)
                    res.send(err);
                res.json(Object.assign({
                    author: user
                }, JSON.parse(JSON.stringify(task))));
            });
        });
    }

    /*create_a_task(req, res) {
        const new_task = new Task(req.body);
        new_task.save(function(err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    }

    read_a_task(req, res) {
        Task.findById(req.params.taskId, function(err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    }

    update_a_task(req, res) {
        Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    }

    delete_a_task(req, res) {
        Task.remove({
            _id: req.params.taskId
        }, function(err, task) {
            if (err)
                res.send(err);
            res.json({ message: 'Task successfully deleted' });
        });
    }*/

}
