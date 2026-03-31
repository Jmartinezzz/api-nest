import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	content: string

	@IsString()
	@IsOptional()
	coverImage?: string

	@IsString()
	@IsOptional()
	summary?: string

}
