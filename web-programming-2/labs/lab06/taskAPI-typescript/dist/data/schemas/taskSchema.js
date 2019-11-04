"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.TaskSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    hoursEstimated: {
        type: Number
    },
    completed: {
        type: Boolean
    },
    comment: [{ name: String, comment: String }]
});
