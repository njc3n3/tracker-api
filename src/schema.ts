import {makeSchema, objectType, stringArg, intArg} from '@nexus/schema'
import {nexusPrisma} from 'nexus-plugin-prisma'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.password()
    t.model.routineFolders({
      type: 'RoutineFolder',
      resolve: ({id}, _args, ctx) => ctx.prisma.routineFolder.findMany({where: {routineFolder_UserId: id}})
    })
  }
})

const RoutineFolder = objectType({
  name: 'RoutineFolder',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.user({
      type: 'User',
      resolve: ({id}, _args, ctx) => ctx.prisma.user.findFirst({where: {routineFolders: {some: {id}}}})
    })
  }
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('user', {
      type: 'User',
      args: {id: intArg({nullable: false})},
      resolve: (_, {id}, ctx) => ctx.prisma.user.findOne({where: {id}})
    })
    t.field('users', {
      type: 'User',
      list: true,
      resolve: (_, _args, ctx) => ctx.prisma.user.findMany()
    })

    t.field('routineFolder', {
      type: 'RoutineFolder',
      args: {id: intArg({nullable: false})},
      resolve: (_, {id}, ctx) => ctx.prisma.routineFolder.findOne({where: {id}})
    })
    t.field('routineFolders', {
      type: 'RoutineFolder',
      list: true,
      args: {userId: intArg({nullable: false})},
      resolve: (_, {userId}, ctx) => ctx.prisma.routineFolder.findMany({where: {routineFolder_UserId: userId}})
    })
  }
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        name: stringArg({nullable: false}),
        password: stringArg({nullable: false}),
        email: stringArg({nullable: false})
      },
      resolve: (_, data, ctx) => ctx.prisma.user.create({data})
    })

    t.field('createRoutineFolder', {
      type: 'RoutineFolder',
      args: {
        name: stringArg({nullable: false}),
        userId: intArg({nullable: false})
      },
      resolve: (_, {name, userId}, ctx) =>
        ctx.prisma.routineFolder.create({
          data: {
            name,
            user: {connect: {id: userId}}
          }
        })
    })
  }
})

export const schema = makeSchema({
  types: [Query, Mutation, RoutineFolder, User],
  plugins: [nexusPrisma()],
  // plugins: [nexusPrisma({experimentalCRUD: true})],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts'
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma'
      },
      {
        source: require.resolve('./context'),
        alias: 'Context'
      }
    ]
  }
})
