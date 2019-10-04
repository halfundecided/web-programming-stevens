# Lecture 05: Intro to Redis

## Terms

- Redis: An in-memory data structure store
- Cache: A collection of data stored in a quickly-performing lookup for future use
- Fast: Like "racing stripes on a a Lamborghini that is being chased by a Ferrari driven by fire-breathing demons" sort of fast.

## Redis Concepts

### What is Redis?

Redis is an in memory data structure store.  
Redis is often used as a high-performing lookup. Reads and write operations are extremely fast.  
You can store a number of data types in Redis:

- Strings
- Sets
- Lists
- Sorted sets
- Hashes
- Bit arrays

### How it works

- Redis keeps the entire data-set in memory in a highly efficient structure.
  - The more data you have, the more memory you will need
  - Can vertically scale this with huge RAM machines
  - Can horizontally scale by sharing the data across many machines
- Because this data is in memory, Redis is extremely fast.
  - As a tradeoff, it has no querying
- All operations are atomic

### What it's good at

- Amazing at write and retrieval
  - Does not sync to disk every operation
- Better than Memcache at caching
  - Redis was able to learn from failings in Memcache
  - Can store more than just strings; can store lists, sets, etc
  - Allows for more complex uses
- Amazing scale out capabilities

### Constraints and issues

- Does not sync constantly to disk; some data loss expected
- No querying
- Can be costly to keep everything in RAM

### Common Uses

- Session Storage
- Full-page caching
- Real time statistics
- Recent posts
- Scoreboards
- Pub/ Sub

## Redis Syntax

### Using Redis CLI

After installing Redis and the Redis CLI, you will be able to interact with Redis by:

- Making sure your Redis server is running
- Running the redis-cli command  
  You can test your install with the CLI
- Run: `redis-cli PING`
- You should get a response back of: PONG

### Syntax

You can interact with Redis through a series of simple commands

- [https://redis.io/commands](https://redis.io/commands)

## Redis Use Cases

### Session Storage

- What is a session?
  - A
