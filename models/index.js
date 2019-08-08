const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

const Page = db.define("page", {
  title: {
      type: Sequelize.STRING,
      allowNull: false
  },
  slug: { 
    type: Sequelize.STRING,
    allowNull: false
  },  
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },    
  status: {
    type: Sequelize.ENUM("open", "closed")
  }
});

Page.beforeCreate((pageInstance) => {
  pageInstance.slug = generateSlug(pageInstance.title)
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },    
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        isEmail: true
    }
  }
});

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db,
  Page,
  User
};
