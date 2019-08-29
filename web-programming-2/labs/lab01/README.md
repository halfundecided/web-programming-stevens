# CS554 Web Programming2: Lab1

## Reviewing API Development

For this lab, you will submit a web server with the supplied routes and middlewares.

- [ ] `GET`: `/api/tasks` - Shows a list of tasks. By default, it will show the first 20 tasks in the collection. If a querystring variable `?skip=n` is provided, you will skip the first `n` tasks. If a querystring variable `?take=y` is provided, it will show `y` number of results. By default, the route will show up to `20` tasks; at most, it will show `100` tasks.
- [ ] `GET`: `/api/tasks/:id` - Shows the task with the supplied ID
- [ ] `POST`: `/api/tasks` - Creates a task with the supplied detail and returns created object; fails request if not all details supplied
- [ ] `PUT`: `/api/tasks/:id` -
