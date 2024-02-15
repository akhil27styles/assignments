"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = exports.updateTodo = exports.createTodo = void 0;
var __1 = require("..");
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 7, 9]);
                    return [4 /*yield*/, __1.client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, __1.client.query('BEGIN')];
                case 2:
                    _a.sent();
                    query = 'INSERT INTO todo (userId,title,description) VALUES ($1,$2,$3) RETURNING *';
                    values = [userId, title, description];
                    return [4 /*yield*/, __1.client.query(query, values)];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, __1.client.query('COMMIT')];
                case 4:
                    _a.sent();
                    return [2 /*return*/, result.rows[0]];
                case 5:
                    err_1 = _a.sent();
                    return [4 /*yield*/, __1.client.query('ROLLBACK')];
                case 6:
                    _a.sent();
                    console.error('Error during transaction, rolled back', err_1);
                    throw err_1;
                case 7: return [4 /*yield*/, __1.client.end()];
                case 8:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.createTodo = createTodo;
createTodo(8, 'securepassword123', 'johndoe');
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
function updateTodo(todoId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 6, 8]);
                    return [4 /*yield*/, __1.client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, __1.client.query('BEGIN')];
                case 2:
                    _a.sent();
                    query = 'INSERT INTO todos where todoId=$1 done=$2';
                    values = [todoId, true];
                    return [4 /*yield*/, __1.client.query(query, values)];
                case 3:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/, result.rows[0]];
                case 4:
                    err_2 = _a.sent();
                    return [4 /*yield*/, __1.client.query('ROLLBACK')];
                case 5:
                    _a.sent();
                    console.log('Get tods failed', err_2);
                    throw err_2;
                case 6: return [4 /*yield*/, __1.client.end()];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.updateTodo = updateTodo;
//updateTodo(1)
/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 6, 8]);
                    return [4 /*yield*/, __1.client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, __1.client.query('BEGIN')];
                case 2:
                    _a.sent();
                    query = 'SELECT * FROM todos where userID=$1';
                    values = [userId];
                    return [4 /*yield*/, __1.client.query(query, values)];
                case 3:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/, result.rows[0]];
                case 4:
                    err_3 = _a.sent();
                    return [4 /*yield*/, __1.client.query('ROLLBACK')];
                case 5:
                    _a.sent();
                    console.log('Get tods failed', err_3);
                    throw err_3;
                case 6: return [4 /*yield*/, __1.client.end()];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getTodos = getTodos;
//getTodos(1);
