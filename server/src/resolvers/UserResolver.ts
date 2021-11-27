import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'
import argon2 from 'argon2'
import { User } from '../entities'
import { COOKIE_NAME } from '../constants'
import { MyContext } from '../types/my-context'

@ObjectType()
class FieldError {
  @Field()
  field!: string
  @Field()
  message!: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null
    }

    return User.findOne(req.session.userId)
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } })

    if (!user) {
      return {
        errors: [{ field: 'username', message: "username doesn't exist" }],
      }
    }

    const valid = await argon2.verify(user.password, password)

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      }
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id

    return { user }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(password)

    let user

    try {
      user = await User.create({
        username,
        password: hashedPassword,
        role: 'user',
      }).save()
    } catch (error: any) {
      if (error.code === 11000) {
        return {
          errors: [{ field: 'username', message: 'username already taken' }],
        }
      }

      console.error('message: ', error.message)
    }

    req.session.userId = user?.id // auto-login after registration

    return { user }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((error) => {
        res.clearCookie(COOKIE_NAME)

        if (error) {
          console.log(error)
          resolve(false)

          return
        }

        resolve(true)
      })
    )
  }
}

export default UserResolver
