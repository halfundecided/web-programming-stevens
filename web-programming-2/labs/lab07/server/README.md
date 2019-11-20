## I am confuseeeed

### Any cases that the user updates ImagePost

#### `/` route

##### Add to bin

```js
{
    id: uuid.v4(),
    url: url,
    poster_name: poster_name,
    description: description,
    user_posted: false,
    binned: false
}
```

TO

```js
{
    id: uuid.v4(),
    url: url,
    poster_name: poster_name,
    description: description,
    user_posted: false,
    binned: true
}
```

and cache to redis

##### Remove from bin

```js
{
    id: uuid.v4(),
    url: url,
    poster_name: poster_name,
    description: description,
    user_posted: false,
    binned: true
}
```

TO

```js
{
    id: uuid.v4(),
    url: url,
    poster_name: poster_name,
    description: description,
    user_posted: false,
    binned: false
}
```

and remove from redis

#### `/my-posts` route

##### Add to bin

```js
{
    id: uuid.v4(),
    url: url,
    poster_name: poster_name,
    description: description,
    user_posted: true,
    binned: false
}
```

TO

```js
{
    id: uuid.v4(),
    url: url,
    poster_name: poster_name,
    description: description,
    user_posted: true,
    binned: true
}
```

##### Remove from bin

```js
{
    id: uuid.v4(),
    url: url,
    poster_name: poster_name,
    description: description,
    user_posted: true,
    binned: true
}
```

TO

```js
{
    id: uuid.v4(),
    url: url,
    poster_name: poster_name,
    description: description,
    user_posted: true,
    binned: false
}
```
