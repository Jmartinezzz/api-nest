import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";

export class CreateProfileDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	name: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@IsOptional()
	avatar: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto){}

