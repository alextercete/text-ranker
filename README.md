# Text ranker

## Prerequisites

Make sure you have Node.js installed.

## Running

```bash
$ bin/text-ranker
```

Optionally, specify the TCP (defaults to `5555`) and HTTP (defaults to `8080`) ports to use:

```bash
$ bin/text-ranker --tcp-port 4444 --http-port 9090
```

## Contributing

1. Install the dependencies:

  ```bash
  $ npm install
  ```

2. Run the tests:

  ```bash
  $ npm test
  ```
  
## TODO

### Use persistent storage

Use Redis in order to allow scaling up the application to run as multiple processes/servers. This means replacing [`inMemoryStorage`](lib/in-memory-storage.js) with an implementation that wraps the following commands:

| Wrapper method                          | Redis command                                   |
|-----------------------------------------|-------------------------------------------------|
| `redisStorage.count`                    | [ZCOUNT](http://redis.io/commands/zcount)       |
| `redisStorage.getHighestScoringMembers` | [ZREVRANGE](http://redis.io/commands/zrevrange) |
| `redisStorage.incrementMemberScore`     | [ZINCRBY](http://redis.io/commands/zincrby)     |

For the integration tests, set up a local Redis server using Vagrant.

### Improve command-line interface

Provide a `--help` option.
