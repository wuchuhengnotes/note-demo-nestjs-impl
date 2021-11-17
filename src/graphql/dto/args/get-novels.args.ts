import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetNovelsArgs {
  @Field(
    type => [ID],
    {
      nullable: 'items',
      description: '书id数列'
    }
  )
  @IsNotEmpty()
  ids: string[];
}