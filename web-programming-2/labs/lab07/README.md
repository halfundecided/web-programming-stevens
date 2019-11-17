# CS554 Web Programming2: Lab7

For this assignment, we are going to apply what we've learned with Redis, React, and now finally GraphQL to make an image curation website similar to Pinterest, called Binterest.

## Data

Image posts are the primary pieces of data that we're going to concern ourselves with. A post will be defined in the following format:

```js
type ImagePost {
    id: ID!
    url: String!
    poster_name: String!
    description: String!
    user_posted: Boolean!
    binned: Boolean!
}
```

In the above Schema,

- [ ] `id`, `url`, `poster_name` and `description` will be populated using the UnsplashAPI.
- [ ] `poster_name` reporesents the author of the image post.
- [ ] `binned` will represent whether the user has added the image to their bin or not.
- [ ] If a user adds a post to their Bin, the post is then saved into Redis for later use.
- [ ] `user_posted` represents whether this post came from the UnsplashAPI(false) or if it was Binterest user_posted Image Post(true)

## Backend

This assignment's backend will be implemented using Apollo Server. Im particular, you will be to support the following queries and mutations to make this webapp functional:

### Queries

- [ ] `unsplashImage(pageNum: Int) -> [ImagePost]`: You will map this route in the Unsplash REST API in this query's resolver function to create ImagePost objects from the results of the REST API.
- [ ] `likedImages -> [ImagePost]`: You will go to redis to retrieve the ImagePost objects that the user has saved
- [ ] `userPostedImages -> [ImagePost]`: You will query all images that the user has submitted.

### Mutations

- [ ] `uploadImage(url: String!, description: String, author: String) -> ImagePost`: This mutation will create an ImagePost and will be saved in Redis. Outside of the provided values from the "New Post" form, by default, the following values of `ImagePost` should be:
  - `binned`: false
  - `user_posted`: true
  - `id`: a uuid
- [ ] `updateImage(id: ID!, url: String, author: String, description: String, user_posted: Boolean, binned: Boolean) -> ImagePost`: This mutation will take care of any updates that we want to perform on a particular image post
  - If an image post that came from Unsplash and was removed from the bin, you should also remove it from the cache
  - If this image was not previously in the cache, and the
- [ ] `deleteImage(id: ID!) -> ImagePost`: Delete a user-posted Image Post

## Frontend Routes

Here, we need to use Apollo Client to interact with out bacnend to provide data to our frontend.

- `/`
  - [ ] Should display a list of image post results from Unsplash.
  - [ ] A user should be able to click a "Get More" button in order to perform another query to get more images from Unsplash.
  - [ ] A user should be able to click on a "Add to Bin" button found on a particular image post to "bin a post.
    - [ ] Once a post has been added to the user's bin, the "Add to bin" button should be toggled to "Remove from bin"
- `/my-bin`
  - [ ] Should display a list of image posts that the user has previously added to their bin.
  - [ ] This page should have similar functionality as the `/` page.
- `/my-posts`
  - [ ] Should display a list of image posts that the user has uploaded.
  - [ ] This page should have similar functionality as the `/` page.
    - [ ] However, the user should be able to delete their posts from this page
    - [ ] Users can also only upload new posts from here as well.
- `/new-post`

  - Should render a form that has fields for:
    - Image URL (we only allow image urls that are already on the internet)
    - Description
    - Author name (this should be in theory be the same all the time, but user identification is out of the scope of this lab)

## Special Behavior

- [ ] Binning Posts: when a user adds a post to their bin, if the post came from the Unsplash API, then you should save the post to the cache. However, if the post is user-posted, then even iff the user doesn't add the post to their bin, it should stay in the cache.
- [ ] Any failures, like the failure to bin an image, op to delete should fail graceffully. (id: if it fails, display a message)
