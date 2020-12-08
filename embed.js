var mongoose = require("mongoose");

mongoose.connect("/mongodb://localhost:27017/blog_app", { useNewUrlParser: true });



var postSchema = new mongoose.Schema({
    title: String,
    comments: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// How to add new post in the user objects------------------

var newUser = new User({
    name: "hermoine",
    email: "hermoine@hogwarts.edu"
});

newUser.posts.push({
    title: "how to bree polyjuicde potion",
    comments: "just kidding , go to potion class to learn it"
})
newUser.save(function(err, user) {
    if (err) {
        console.log(err)
    } else {
        console.log(user)
    }
});

// How to find post and new post in that old post----------------

User.findOne({
    name: "hermoine",
    email: "hermoine@hogwarts.edu"
}, function(err, user) {
    if (err) {
        console.log(err)
    } else {
        user.posts.push({
            title: "3 things i really hate",
            comments: "voldemart , voldemart , voldemart"
        });
        user.save(function(err, user) {
            if (err) {
                console.log(err)
            } else(console.log(user))
        });
    }
});