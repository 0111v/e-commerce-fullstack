const bcrypt = require('bcrypt')

bcrypt.hash('admin@admin', 10).then(console.log)