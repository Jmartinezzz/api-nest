import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateProfileDto, UpdateProfileDto } from "./profile.dto";
import { PartialType, OmitType } from "@nestjs/mapped-types";

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;

	@ValidateNested()
	@IsNotEmpty()
	@Type(() => CreateProfileDto)
	profile: CreateProfileDto;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
	@ValidateNested()
	@IsOptional()
	@Type(() => UpdateProfileDto)
	profile: UpdateProfileDto;
}


