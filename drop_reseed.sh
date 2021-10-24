# ! have to log off psql first
npx dotenv sequelize-cli db:drop
npx dotenv sequelize-cli db:create
#npx dotenv sequelize-cli db:seed:undo:all
#npx dotenv sequelize-cli db:migrate:undo:all
npx dotenv sequelize-cli db:migrate
npx dotenv sequelize-cli db:seed:all
