import { AuthorsResolver } from './authors.resolver';
import { CreateAuthorInput } from '../dto/input/create-author.input';
import { Author } from '../models/author.model';
import { GetAuthorsArgs } from '../dto/args/get-authors.args';
import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { AuthorsServiceImpl } from '../service/authors-impl/authors.serviceImpl';
import { GetAuthorArgs } from '../dto/args/get-author.args';
import { Post } from '../models/post.model';
import { PostsImplService} from '../service/posts-impl/posts-impl.service';
import { UpdateAuthorInput } from '../dto/input/update-author.input';
import { DeleteAuthorInput } from '../dto/input/delete-author.input';

@Resolver(of => Author)
export class AuthorsResolverImpl implements AuthorsResolver{
  constructor(
    private readonly authorsServiceImpl: AuthorsServiceImpl,
    private readonly postsImplService: PostsImplService
    ) { }

  @Query(type => [Author], {description: '获取作者数列', name: 'authors'})
  getAuthors(@Args() getAuthorsArgs: GetAuthorsArgs): Author[] {
    return this.authorsServiceImpl.getAuthors(getAuthorsArgs)
  }

  @Mutation(type => Author, {description: '创建一名作者'})
  createAuthor(@Args('createAuthorInput') createAuthorInput: CreateAuthorInput): Author {
    return this.authorsServiceImpl.createAuthor(createAuthorInput)
  }

  @Query(type => Author, {description: '获取一名作者', name: 'author'})
  getAuthor(@Args() getAuthorArgs: GetAuthorArgs): Author {
    return this.authorsServiceImpl.getAuthor(getAuthorArgs)
  }

  @ResolveField('posts', returns => [Post])
  getPosts(@Parent() author: Author): Post[] {
    return this.postsImplService.getPosts({ids: [author.id]})
  }

  @Mutation(type => Author, {description: '更新作家'})
  updateAuthor(@Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput): Author {
    return this.authorsServiceImpl.updateAuthor(updateAuthorInput)
  }

  @Mutation(type => Author, {description: '删除作家'})
  deleteAuthor(@Args('deleteAuthorInput') deleteAuthorInput: DeleteAuthorInput): Author {
    return this.authorsServiceImpl.deleteAuthor(deleteAuthorInput)
  }

  @Subscription(returns => [Author], {name: 'authors', description: '订阅作者数列'})
  subscriptAuthors(): AsyncIterator<Author[]> {
    return this.authorsServiceImpl.pubSub.asyncIterator<Author[]>('authors')
  }
}