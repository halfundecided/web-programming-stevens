const { checkObjectId } = require('./utils');

const {
    usersCollection,
    todosCollection
} = require('../config/mongoCollectionns');

/* Gets all the todos in the todos collection */

async function getAll() {
    const todos = await todosCollection();
    const allTodos = await todos.find().toArray();
    const users = await usersCollection();
    
    for (let todo of allTodos) {
        // Get the user with the _id matching the creator
        const todoCreator = await users.findOne(
            { _id: todo.creator },
            { projection: { _id: 1, name: 1 } }
        );
        // Overwrite th ecreator of the user object
        todo.creator = todoCreator;
    }
    return allTodos;
}

/**
 * Gets a todo document by a specific id, with their creator field populated 
 * @param {any} id id of todo to find
 */
async function getById(id) {
    const checkedId = await checkObjectId(id);
    const todos = await todosCollection();
    const foundTodo = await todos.findOne({ _id: checkedId });
    if(!foundTodo) throw `Todo (${checkedID}) was not found!`;
    // Get the user with the _id matching the ceator field
    const users = await usersCollection();
    const todoCreator = await users.findOne(
        
    )
}