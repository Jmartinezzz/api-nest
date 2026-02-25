import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

	@IsString()
	@IsOptional()
	@MinLength(6)
	password: string;
}
