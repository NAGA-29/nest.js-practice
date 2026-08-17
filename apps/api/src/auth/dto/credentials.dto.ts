import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  username;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password;
}
