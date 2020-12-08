var mongoose = require("mongoose");

mongoose.connect("/mongodb://localhost:27017/blog_demo2", { useNewUrlParser: true });



var postSchema = new mongoose.Schema({
    title: String,
    comments: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

var User = mongoose.model("User", userSchema);

// User.create({
//     name: "Bob",
//     email: "bob@shpherd.edu"
// });

Post.create({
    title: "Hoe to cook best burger pt.2",
    comments: 'blah! blah! blah!'
}, function(err, post) {
    User.findOne({ name: "Bob" }, function(err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data)
                }
            });
        };
    });
});

User.findOne({ name: "Bob" }).populate("posts").exec(function(err, user) {
    if (err) {
        console.log(err)
    } else {
        console.log(user)
    }
});