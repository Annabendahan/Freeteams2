# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



teams = Team.create([
  {
    title: "Women in Tech",
    description: "Group for women in techno looking for help and tips",
    location: "Paris 20",
    user_id: 1
    },

    {
    title: "Graphistes en herbe",
    description: "Graphistes debutants par ici! ",
    location: "Paris 18",
    user_id: 1
    }

    ])
