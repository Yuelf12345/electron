const { v4: uuidv4 } = require('uuid');

const uuid = () => uuidv4();
module.exports = {
    uuid,
}