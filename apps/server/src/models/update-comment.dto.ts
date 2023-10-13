import { MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @MaxLength(100)
  comment: string;
}
